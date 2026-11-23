<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('brief_orders', function (Blueprint $table) {
            $table->string('source', 20)->default('site');
            $table->unsignedBigInteger('telegram_id')->nullable();
            $table->string('telegram_username')->nullable();
            $table->string('token', 64)->nullable()->unique();
            $table->text('task_description')->nullable();
            $table->string('budget', 200)->nullable();
            $table->string('deadline', 200)->nullable();
            // Старые заявки — полные брифы; короткая заявка из бота создаётся с false
            $table->boolean('brief_completed')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('brief_orders', function (Blueprint $table) {
            $table->dropColumn(['source', 'telegram_id', 'telegram_username', 'token',
                'task_description', 'budget', 'deadline', 'brief_completed']);
        });
    }
};
