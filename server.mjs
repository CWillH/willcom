import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const publicRoot = path.resolve(fileURLToPath(new URL('./public/', import.meta.url)));
const types = { '.json': 'application/json; charset=utf-8', '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime' };
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'self'; frame-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
};

function json(response, code, data, headers = {}) {
  response.writeHead(code, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  response.end(JSON.stringify(data));
}

export function createPortfolioServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      if (!['GET', 'HEAD'].includes(request.method)) return json(response, 405, { ok: false }, { Allow: 'GET, HEAD' });
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { return json(response, 400, { ok: false }); }
      if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').some(part => part.startsWith('.'))) return json(response, 404, { ok: false });
      const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
      const filename = path.resolve(publicRoot, relative);
      if (!filename.startsWith(publicRoot + path.sep) && filename !== path.join(publicRoot, 'index.html')) return json(response, 404, { ok: false });
      const extension = path.extname(filename).toLowerCase();
      if (!types[extension]) return json(response, 404, { ok: false });
      try {
        const info = await stat(filename);
        if (!info.isFile()) return json(response, 404, { ok: false });
        const body = await readFile(filename);
        if (types[extension].startsWith('video/')) {
          const headers = { ...securityHeaders, 'Content-Type': types[extension], 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };
          if (request.headers.range) {
            const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
            let start, end;
            if (match && (match[1] || match[2])) {
              start = match[1] ? Number(match[1]) : Math.max(0, body.length - Number(match[2]));
              end = match[1] && match[2] ? Math.min(Number(match[2]), body.length - 1) : body.length - 1;
            }
            if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= body.length || end < start) {
              response.writeHead(416, { ...headers, 'Content-Range': `bytes */${body.length}`, 'Content-Length': 0 });
              return response.end();
            }
            response.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Content-Length': end - start + 1 });
            return response.end(request.method === 'HEAD' ? undefined : body.subarray(start, end + 1));
          }
          response.writeHead(200, { ...headers, 'Content-Length': body.length });
          return response.end(request.method === 'HEAD' ? undefined : body);
        }
        response.writeHead(200, { ...securityHeaders, 'Content-Type': types[extension], 'Content-Length': body.length, 'Cache-Control': extension === '.woff2' ? 'public, max-age=31536000, immutable' : 'no-cache' });
        response.end(request.method === 'HEAD' ? undefined : body);
      } catch (error) {
        if (error.code === 'ENOENT' || error.code === 'EISDIR') return json(response, 404, { ok: false });
        throw error;
      }
    } catch (error) {
      if (!response.headersSent) json(response, error.status || 500, { ok: false, message: error.status ? error.message : 'Something went wrong. Please try again.' });
      else response.end();
    }
  });
  server.requestTimeout = 30000;
  server.headersTimeout = 15000;
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const env = process.env;
  const server = createPortfolioServer();
  const port = Number(env.PORT || 4186);
  const host = env.HOST || '127.0.0.1';
  server.listen(port, host, () => {
    console.log(`William Huang portfolio: http://${host}:${port}`);
  });
  server.on('error', error => {
    console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. Choose another PORT in .env.` : 'The preview server could not start.');
    process.exitCode = 1;
  });
}
