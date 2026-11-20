<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private function items(): array
    {
        return [
            [
                'title' => '38 новостей',
                'url' => 'https://38news.ru',
                'screenshot_path' => '/images/portfolio/38news.jpg',
                'stack' => 'WordPress, PHP, MySQL, Elementor, CodeStar Framework, W3 Total Cache, Nginx, Yoast SEO, Яндекс Метрика',
                'description' => 'Региональный новостной сайт Иркутска. Собственная тема на фреймворке Evior с плагином-компаньоном: лента новостей, рубрики, мнения и видеопрограмма. Настройки темы вынесены в панель CodeStar Framework, выгрузка RSS-ленты для Яндекс Дзена и Яндекс Новостей, полное кеширование страниц и минификация через W3 Total Cache, сжатие изображений, SEO под Яндекс и счётчики аналитики.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Дети Байкала',
                'url' => 'https://detibaikala38.ru',
                'screenshot_path' => '/images/portfolio/detibaikala38.jpg',
                'stack' => 'WordPress, PHP, MySQL, JavaScript, Лейка (Leyka), Customizer API, Rutube, Montserrat и Inter',
                'description' => 'Сайт благотворительного фонда помощи детям-сиротам и семьям с детьми-инвалидами Иркутской области. Авторская тема с модулями: проекты, отчёты по годам, команда, партнёры, документы, отзывы, СМИ о фонде. Приём пожертвований через плагин «Лейка», анкета наставника с сохранением заявок, форма контактов, импорт материалов СМИ. Собственный плагин «Конкурс детского рисунка»: приём работ с модерацией и зрительское голосование с защитой от накрутки. Весь общий контент редактируется в настройках темы, есть тёмная тема.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Зелёный берег',
                'url' => 'https://zelber.ru',
                'screenshot_path' => '/images/portfolio/zelber.jpg',
                'stack' => 'WordPress, PHP, MySQL, JavaScript, Customizer API, AJAX, Playfair Display, Nunito',
                'description' => 'Официальный сайт СНТ «Зелёный берег»: новости, документы с категориями, фотогалерея событий, полезные номера, карточки правления и контактов, оплата взносов через СБП. Тема написана с нуля, свои типы записей. Администратор правит главный блок, цифры, тексты и стили прямо на сайте, без входа в админку WordPress.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Герои Приангарья',
                'url' => 'https://герои-приангарья.рф',
                'screenshot_path' => '/images/portfolio/geroi-priangarjya.jpg',
                'stack' => 'PHP, HTML, CSS, JavaScript, jQuery, Nicepage, intl-tel-input, Яндекс Метрика',
                'description' => 'Сайт региональной программы развития для участников СВО, которую правительство Иркутской области реализует вместе с РАНХиГС. Одностраничник с разделами: цели, что получают участники, условия, этапы и положение. Адаптивная вёрстка по макету, общие шапка и подвал вынесены в PHP-подключения, страницы политики и положения, форма с маской телефона, переход в личный кабинет программы.',
                'sort_order' => 4,
            ],
            [
                'title' => 'Служба по контракту 38',
                'url' => 'https://служба-по-контракту38.рф',
                'screenshot_path' => '/images/portfolio/contract38.jpg',
                'stack' => 'WordPress, PHP, MySQL, Tailwind CSS, JavaScript, jQuery',
                'description' => 'Информационный сайт о службе по контракту в Иркутской области. Авторская тема на базе Underscores со сборкой стилей через Tailwind CSS. Разделы: наши герои, помощь землякам, социальная поддержка, контакты, СМИ и видео. Адаптивная вёрстка, отдельные шаблоны страниц и призыв к действию на главной.',
                'sort_order' => 5,
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
