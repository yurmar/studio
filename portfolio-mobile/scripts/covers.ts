/**
 * Собирает обложки 1320×880: три экрана в рамках телефонов на мягком однотонном фоне.
 * Запуск: npm run covers (после npm run screenshots).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';

import { concepts } from './concepts';

const root = resolve(__dirname, '..');

/** Какие экраны ставить слева, в центре и справа (по имени файла без .png). */
const picks: Record<string, [string, string, string]> = {
  habits: ['1-onboarding', '2-today', '3-habit'],
  barber: ['1-services', '2-masters', '3-time'],
  grocery: ['2-catalog', '1-home', '3-product'],
  fitness: ['2-workout', '1-plan', '3-history'],
  audio: ['2-book', '1-home', '3-player'],
};

const phone = (src: string, height: number, top: number, left: number, z: number) => {
  const bezel = Math.round(height * 0.014);
  const screenH = height - bezel * 2;
  const screenW = Math.round((screenH * 390) / 844);
  const width = screenW + bezel * 2;
  const radius = Math.round(width * 0.14);
  return `
  <div style="position:absolute;top:${top}px;left:${left}px;width:${width}px;height:${height}px;z-index:${z};
    border-radius:${radius}px;background:#16171B;padding:${bezel}px;box-sizing:border-box;
    box-shadow:0 ${Math.round(height * 0.04)}px ${Math.round(height * 0.09)}px rgba(30,30,40,.28), 0 2px 6px rgba(30,30,40,.18), inset 0 0 0 2px #2A2C33;">
    <img src="file://${src}" style="width:100%;height:100%;display:block;border-radius:${radius - bezel}px;object-fit:cover">
  </div>`;
};

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1320, height: 880 }, deviceScaleFactor: 1 });
  mkdirSync('/tmp/p', { recursive: true });

  for (const concept of concepts) {
    const shot = (name: string) => join(root, 'portfolio', concept.id, 'screens', `${name}.png`);
    const [l, m, r] = picks[concept.id];
    const sideH = 640;
    const midH = 760;
    const midW = Math.round(((midH - Math.round(midH * 0.014) * 2) * 390) / 844) + Math.round(midH * 0.014) * 2;
    const sideW = Math.round(((sideH - Math.round(sideH * 0.014) * 2) * 390) / 844) + Math.round(sideH * 0.014) * 2;
    const gap = 36;
    const total = sideW * 2 + midW + gap * 2;
    const x0 = Math.round((1320 - total) / 2);

    const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;width:1320px;height:880px;background:${concept.coverBg};position:relative;overflow:hidden">
      ${phone(shot(l), sideH, 150, x0, 1)}
      ${phone(shot(r), sideH, 150, x0 + sideW + gap + midW + gap, 1)}
      ${phone(shot(m), midH, 62, x0 + sideW + gap, 2)}
    </body>`;
    const file = `/tmp/p/cover-${concept.id}.html`;
    writeFileSync(file, html);
    await page.goto('file://' + file, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(root, 'portfolio', concept.id, 'cover.png') });
    console.log(`✔ ${concept.id}/cover.png`);
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
