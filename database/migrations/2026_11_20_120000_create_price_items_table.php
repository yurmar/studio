<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('price_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('icon')->nullable();
            $table->string('price');
            $table->string('term');
            $table->text('description')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        $now = now();
        $rows = [
            ['Лендинг', 'Globe', 'от 30 000 ₽', '5–10 дней', 'Одностраничный сайт: дизайн, адаптив, форма заявки, подключение домена и аналитики.'],
            ['Многостраничный сайт', 'Layers', 'от 80 000 ₽', '3–5 недель', 'Корпоративный сайт или каталог: до 15 страниц, админка, SEO-основа, формы и интеграции.'],
            ['Новостной сайт', 'Newspaper', 'от 120 000 ₽', '4–6 недель', 'Лента публикаций, рубрики, теги, админка редактора, поиск, RSS и SEO-разметка.'],
            ['CRM-система', 'BarChart3', 'от 250 000 ₽', '2–4 месяца', 'Клиенты, сделки, задачи, роли и права, отчёты, интеграции с почтой, телефонией и мессенджерами.'],
            ['Боты', 'Bot', 'от 25 000 ₽', '1–3 недели', 'Telegram- и MAX-боты: заявки, оплата, рассылки, личный кабинет, Mini App, интеграции.'],
            ['Игры на Unity', 'Gamepad2', 'от 150 000 ₽', '1,5–3 месяца', 'Мобильная или ПК-игра: прототип, геймплей, интерфейс, монетизация, публикация в магазинах.'],
        ];
        foreach ($rows as $i => [$title, $icon, $price, $term, $desc]) {
            DB::table('price_items')->insert([
                'title' => $title, 'icon' => $icon, 'price' => $price, 'term' => $term,
                'description' => $desc, 'sort_order' => $i, 'created_at' => $now, 'updated_at' => $now,
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('price_items');
    }
};
