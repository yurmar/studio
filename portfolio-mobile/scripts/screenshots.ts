/**
 * Снимает 4 экрана каждого концепта: 390×844, deviceScaleFactor 3.
 * Запуск: npm run screenshots [-- --url http://localhost:8099] [--only barber]
 * По умолчанию раздаёт папку dist (npm run export:web) на локальном порту.
 */
import { mkdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright';

import { concepts } from './concepts';

const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const root = resolve(__dirname, '..');
const dist = join(root, 'dist');
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

/** Статический сервер c SPA-fallback на index.html. */
async function serveDist(): Promise<{ url: string; close: () => void }> {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = join(dist, path);
    try {
      if (!(await stat(file)).isFile()) throw new Error('not file');
    } catch {
      file = join(dist, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  });
  await new Promise<void>((ok) => server.listen(0, ok));
  const port = (server.address() as { port: number }).port;
  return { url: `http://localhost:${port}`, close: () => server.close() };
}

async function main() {
  const external = arg('url');
  const only = arg('only');
  const served = external ? null : await serveDist();
  const base = external ?? served!.url;
  const browser = await chromium.launch();

  for (const concept of concepts.filter((c) => !only || c.id === only)) {
    const out = join(root, 'portfolio', concept.id, 'screens');
    mkdirSync(out, { recursive: true });
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      colorScheme: concept.scheme,
      isMobile: true,
      hasTouch: true,
    });
    for (const screen of concept.screens) {
      const page = await context.newPage();
      await page.goto(base + screen.path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1800); // анимации появления
      await page.screenshot({ path: join(out, `${screen.name}.png`) });
      await page.close();
      console.log(`✔ ${concept.id}/${screen.name}`);
    }
    await context.close();
  }
  await browser.close();
  served?.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
