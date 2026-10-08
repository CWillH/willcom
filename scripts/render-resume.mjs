import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolio } from '../public/content.js';

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const pdfPath = resolve(publicDir, portfolio.resume);
const digest = createHash('sha256').update(await readFile(pdfPath)).digest('hex').slice(0, 12);
const outputDir = join(publicDir, 'assets/resume-preview');
await mkdir(outputDir, { recursive: true });
const prefix = `resume-${digest}`;
const result = spawnSync(process.env.PDFTOPPM || 'pdftoppm', [
  '-png', '-scale-to', '1800', pdfPath, join(outputDir, prefix)
], { encoding: 'utf8' });
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(result.stderr || 'Resume rendering failed');
const filenames = (await readdir(outputDir))
  .filter(name => name.startsWith(`${prefix}-`) && name.endsWith('.png'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (!filenames.length) throw new Error('No resume pages were rendered');
const pages = [];
for (const filename of filenames) {
  const png = await readFile(join(outputDir, filename));
  pages.push({
    src: `./assets/resume-preview/${filename}`,
    width: png.readUInt32BE(16), height: png.readUInt32BE(20)
  });
}
await writeFile(join(publicDir, 'resume-preview.json'), JSON.stringify({ source: portfolio.resume, pages }));
console.log(`Rendered ${pages.length} resume page(s) for mobile browsers`);
