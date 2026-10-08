import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { createPortfolioServer } from '../server.mjs';

test('serves static files, keeps private files inaccessible, and has no contact endpoint', async t => {
  const server = createPortfolioServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const home = await fetch(origin);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /William Huang/);
  assert.ok(home.headers.get('Content-Security-Policy'));
  for (const pathname of ['/.env', '/server.mjs', '/package.json', '/.git/config', '/%2e%2e%2f.env', '/api/contact']) {
    assert.equal((await fetch(origin + pathname)).status, 404);
  }
  assert.equal((await fetch(origin + '/api/contact', { method: 'POST' })).status, 405);
  assert.equal((await fetch(origin, { method: 'HEAD' })).status, 200);
});

test('serves playable video and byte ranges for seeking', async t => {
  const server = createPortfolioServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const url = `http://127.0.0.1:${server.address().port}/assets/robotic_hand_vid.mp4`;
  const bytes = await readFile(new URL('../public/assets/robotic_hand_vid.mp4', import.meta.url));
  const full = await fetch(url);
  assert.equal(full.status, 200);
  assert.equal(full.headers.get('Content-Type'), 'video/mp4');
  assert.equal(full.headers.get('Accept-Ranges'), 'bytes');
  assert.deepEqual(Buffer.from(await full.arrayBuffer()), bytes);
  for (const [range, start, end] of [
    ['bytes=10-19', 10, 19],
    ['bytes=-16', bytes.length - 16, bytes.length - 1],
    [`bytes=${bytes.length - 16}-`, bytes.length - 16, bytes.length - 1]
  ]) {
    const response = await fetch(url, { headers: { Range: range } });
    assert.equal(response.status, 206);
    assert.equal(response.headers.get('Content-Range'), `bytes ${start}-${end}/${bytes.length}`);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes.subarray(start, end + 1));
  }
  for (const range of [`bytes=${bytes.length}-`, 'bytes=20-10', 'bytes=-0', 'bytes=0-1,10-11']) {
    const response = await fetch(url, { headers: { Range: range } });
    assert.equal(response.status, 416);
    assert.equal(response.headers.get('Content-Range'), `bytes */${bytes.length}`);
  }
  const head = await fetch(url, { method: 'HEAD', headers: { Range: 'bytes=10-19' } });
  assert.equal(head.status, 206);
  assert.equal(head.headers.get('Content-Length'), '10');
  assert.equal((await head.arrayBuffer()).byteLength, 0);
});
