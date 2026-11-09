<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    // Название задачи плана могло обрезаться на 255 символах — делаем TEXT.
    public function up(): void
    {
        DB::statement('ALTER TABLE project_tasks MODIFY title TEXT NOT NULL');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE project_tasks MODIFY title VARCHAR(255) NOT NULL');
    }
};
