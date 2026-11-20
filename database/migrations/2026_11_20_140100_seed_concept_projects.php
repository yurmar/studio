<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private function items(): array
    {
        $note = ' Концепт для портфолио: бренд, тексты и цифры вымышлены, работа не выполнялась для реального заказчика.';

        return [
            [
                'title' => 'Зерно и пар — кофейня',
                'url' => '/concepts/zerno-i-par/',
                'screenshot_path' => '/images/portfolio/concept-zerno-i-par.jpg',
                'stack' => 'Next.js, TypeScript, Tailwind CSS, Lora, Inter',
                'description' => 'Лендинг городской кофейни из четырёх блоков: первый экран, меню-хиты, о нас с адресом и картой-заглушкой, форма брони стола с валидацией и состоянием «Отправлено». Тёплый минимализм, адаптив 390, 768 и 1440 px, SEO-метатеги и Open Graph, Lighthouse 95+.' . $note,
                'sort_order' => 6,
            ],
            [
                'title' => 'TalkTime — школа английского',
                'url' => '/concepts/talktime/',
                'screenshot_path' => '/images/portfolio/concept-talktime.jpg',
                'stack' => 'Next.js, TypeScript, Tailwind CSS, Nunito',
                'description' => 'Лендинг онлайн-школы английского для взрослых из восьми блоков: боли и решения, форматы, преподаватели, шаги урока, слайдер отзывов, тарифы с выделенным средним, FAQ-аккордеон и форма записи на пробный урок. Яркий дружелюбный стиль со стикерами и пузырями диалогов.' . $note,
                'sort_order' => 7,
            ],
            [
                'title' => 'Белая линия — стоматология',
                'url' => '/concepts/belaya-liniya/',
                'screenshot_path' => '/images/portfolio/concept-belaya-liniya.jpg',
                'stack' => 'Next.js, TypeScript, Tailwind CSS, Inter, SVG',
                'description' => 'Лендинг семейной стоматологии из восьми блоков: первый экран в две колонки с формой записи, услуги с ценами «от», врачи, счётчики клиники, лечение под ключ на вертикальной шкале, лицензии и оборудование, отзывы, контакты с кнопкой звонка, закреплённой внизу на мобильном. Строгая сетка, тонкие линии, иконки в контуре.' . $note,
                'sort_order' => 8,
            ],
            [
                'title' => 'Сосны — загородные дома',
                'url' => '/concepts/sosny/',
                'screenshot_path' => '/images/portfolio/concept-sosny.jpg',
                'stack' => 'Next.js, TypeScript, Tailwind CSS, Cormorant Garamond, Inter',
                'description' => 'Премиальный журнальный лендинг архитектурного бюро из шести блоков: фото на весь экран, асимметричная галерея пяти проектов с деталями по наведению, философия бюро, пять этапов с крупными номерами, команда и минималистичная форма. Заголовки до 96 px.' . $note,
                'sort_order' => 9,
            ],
            [
                'title' => 'Ritmo — CRM для салонов',
                'url' => '/concepts/ritmo/',
                'screenshot_path' => '/images/portfolio/concept-ritmo.jpg',
                'stack' => 'Next.js, TypeScript, Tailwind CSS, Framer Motion, SVG, RU/EN',
                'description' => 'Лендинг облачной CRM из двенадцати блоков в тёмном стиле с glassmorphism: дашборд, сверстанный в HTML, возможности, шаги запуска, онлайн-запись с макетом телефона, аналитика с SVG-графиками, интеграции, тарифы с переключателем «месяц / год, −20%», сравнение тарифов, отзывы, FAQ. Анимации появления на Framer Motion, переключатель языка RU/EN со словарём.' . $note,
                'sort_order' => 10,
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
