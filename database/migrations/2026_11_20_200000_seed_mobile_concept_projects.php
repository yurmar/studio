<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private function items(): array
    {
        $note = ' Концепт для портфолио: бренд, тексты и данные вымышлены, работа не выполнялась для реального заказчика. Демо открывается в браузере в размере телефона.';

        return [
            [
                'title' => 'Шаг — трекер привычек',
                'url' => '/concepts/mobile/habits/welcome',
                'screenshot_path' => '/images/portfolio/concept-mobile-habits.jpg',
                'stack' => 'React Native, Expo, TypeScript, Reanimated, Manrope',
                'description' => 'Мобильное приложение: онбординг из трёх слайдов, экран «Сегодня» с кругом общего прогресса и отметками, календарь серий со статистикой, добавление привычки с иконкой, цветом и расписанием. Светлый мягкий минимализм, пастельный зелёный.' . $note,
                'sort_order' => 11,
            ],
            [
                'title' => 'Ловко — запись в барбершоп',
                'url' => '/concepts/mobile/barber/services',
                'screenshot_path' => '/images/portfolio/concept-mobile-barber.jpg',
                'stack' => 'React Native, Expo, TypeScript, Unbounded, Inter',
                'description' => 'Мобильное приложение записи: выбор услуги с ценой и длительностью, мастер с рейтингом и опытом, горизонтальный календарь со слотами времени, подтверждение записи. Тёмный графит, латунный акцент, крупная типографика.' . $note,
                'sort_order' => 12,
            ],
            [
                'title' => 'Корзинка — доставка продуктов',
                'url' => '/concepts/mobile/grocery/home',
                'screenshot_path' => '/images/portfolio/concept-mobile-grocery.jpg',
                'stack' => 'React Native, Expo, TypeScript, SVG, Nunito',
                'description' => 'Мобильное приложение доставки: главная с поиском, категориями и акциями, каталог с фильтрами-чипами, карточка товара, корзина с адресом, окном доставки и итогом. Светлый стиль, свежий оранжевый акцент, товары в собственных SVG-иллюстрациях.' . $note,
                'sort_order' => 13,
            ],
            [
                'title' => 'Пульс — фитнес и тренировки',
                'url' => '/concepts/mobile/fitness/plan',
                'screenshot_path' => '/images/portfolio/concept-mobile-fitness.jpg',
                'stack' => 'React Native, Expo, TypeScript, SVG, Reanimated, Sora, Onest',
                'description' => 'Мобильное приложение для тренировок: план на неделю, упражнение с круговым таймером отдыха, история с SVG-графиком нагрузки, профиль с целями. Тёмный фон, приглушённый лаймовый акцент, карточки со скруглением 24.' . $note,
                'sort_order' => 14,
            ],
            [
                'title' => 'Слушай — аудиокниги и подкасты',
                'url' => '/concepts/mobile/audio/home',
                'screenshot_path' => '/images/portfolio/concept-mobile-audio.jpg',
                'stack' => 'React Native, Expo, TypeScript, SVG, Lora, Inter',
                'description' => 'Мобильное приложение для слушателей: подборки и «Продолжить слушать», карточка книги с главами, плеер с перемоткой, скоростью и таймером сна, библиотека с загрузками. Тёмно-синий фон, янтарный акцент, обложки как главный визуал.' . $note,
                'sort_order' => 15,
            ],
        ];
    }

    public function up(): void
    {
        foreach ($this->items() as $item) {
            if (DB::table('projects')->where('url', $item['url'])->exists()) {
                continue;
            }
            DB::table('projects')->insert($item + [
                'is_active' => true,
                'is_featured' => false,
                'is_concept' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('projects')->whereIn('url', array_column($this->items(), 'url'))->delete();
    }
};
