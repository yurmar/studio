# portfolio-mobile

Пять концептов мобильных приложений для портфолио: React Native, Expo SDK 58, TypeScript, expo-router.
Бренды, названия и данные вымышлены; сети и серверной части нет.

| Концепт | Маршруты | Тема |
| --- | --- | --- |
| Шаг — привычки | `app/(habits)` | `themes/habits.ts` |
| Ловко — барбершоп | `app/(barber)` | `themes/barber.ts` |
| Корзинка — продукты | `app/(grocery)` | `themes/grocery.ts` |
| Пульс — фитнес | `app/(fitness)` | `themes/fitness.ts` |
| Слушай — аудио | `app/(audio)` | `themes/audio.ts` |

Описание каждого концепта (аудитория, палитра, шрифты, экраны) — в `docs/`.

## Запуск

```bash
npm install
npx expo start        # затем i / a / w для iOS, Android, web
npm run lint && npm run typecheck
```

Стартовый экран `/` — список концептов (только для навигации, в портфолио не идёт).

## Пересборка скриншотов и обложек

```bash
npm run export:web                 # веб-сборка в dist/
npx playwright install chromium    # один раз
npm run screenshots                # 20 скриншотов 390×844 @3x → portfolio/<имя>/screens/
npm run covers                     # 5 обложек 1320×880 → portfolio/<имя>/cover.png
```

`npm run screenshots -- --only barber` снимает один концепт, `--url http://localhost:8081` — с работающего dev-сервера.
Тексты для Kwork — `portfolio/kwork.md`.

## Публикация демо в подпапке сайта

```bash
npm run export:site   # dist-site/, базовый путь /concepts/mobile
```

## Изображения и шрифты

Фотографии не используются: товары, обложки и портреты мастеров — собственные SVG-иллюстрации
(`components/art/`), поэтому авторов фото в списке нет.
Шрифты Google Fonts (лицензия OFL): Manrope, Unbounded, Inter, Nunito, Sora, Onest, Lora.
Sora не содержит кириллицу, поэтому в «Пульсе» она используется для цифр, а текст набран Onest.
