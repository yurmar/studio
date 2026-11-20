/** Контактный лист из 4 экранов концепта для быстрой проверки: npm run sheet -- habits */
import { writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { join, resolve } from 'node:path';

import { concepts } from './concepts';

async function main() {
  const id = process.argv[2];
  const concept = concepts.find((c) => c.id === id);
  if (!concept) throw new Error('concept?');
  const root = resolve(__dirname, '..');
  const imgs = concept.screens
    .map((s) => `<img src="file://${join(root, 'portfolio', id, 'screens', s.name + '.png')}" style="height:900px;margin:0 6px">`)
    .join('');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1700, height: 920 } });
  const html = '/tmp/p/sheet.html';
  writeFileSync(html, `<body style="margin:8px;background:#888;display:flex">${imgs}</body>`);
  await page.goto('file://' + html);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/p/${id}_sheet.png` });
  await browser.close();
}
main();
