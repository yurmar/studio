// Для публикации в подпапке сайта: каждому маршруту — свой index.html,
// чтобы прямые ссылки (/habits/today) открывались без серверного fallback.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const dir = resolve(process.argv[2] ?? 'dist-site');
const routes = [
  'habits', 'habits/welcome', 'habits/today', 'habits/detail', 'habits/add',
  'barber/services', 'barber/masters', 'barber/time', 'barber/confirm',
  'grocery/home', 'grocery/catalog', 'grocery/product', 'grocery/cart',
  'fitness/plan', 'fitness/workout', 'fitness/history', 'fitness/profile',
  'audio/home', 'audio/book', 'audio/player', 'audio/library',
];
for (const route of routes) {
  const target = join(dir, route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(dir, 'index.html'), target);
}
console.log(`index.html скопирован для ${routes.length} маршрутов`);
