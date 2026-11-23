<?php

namespace Tests\Feature;

use App\Models\BriefOrder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BriefOrderBotTest extends TestCase
{
    use RefreshDatabase;

    private function botPayload(): array
    {
        return [
            'contact_person'    => 'Иван, +79991234567',
            'task_description'  => 'Нужен интернет-магазин',
            'budget'            => '300 тыс',
            'deadline'          => '2 месяца',
            'telegram_id'       => 123456,
            'telegram_username' => 'ivan',
        ];
    }

    private function briefPayload(array $extra = []): array
    {
        return $extra + [
            'contact_person' => 'Иван, +79991234567', 'company_name' => 'ООО Ромашка',
            'company_activity' => 'a', 'products_info' => 'b', 'site_sections' => 'c',
            'brand_style' => 'Нет', 'site_types' => ['Интернет-магазин'], 'site_tasks' => ['Привлечение клиентов'],
            'target_audience' => 't', 'language_versions' => 'ru', 'design_impression' => 'd',
            'color_scheme' => 'синий', 'content_placement' => 'x', 'has_advertising' => 'Нет',
            'hosting_type' => 'На хостинге заказчика', 'tech_support' => 'да', 'content_filling' => 'Своими силами',
        ];
    }

    public function test_bot_requires_secret(): void
    {
        config(['services.bot.secret' => 'secret-secret-secret-secret-secret-1']);
        $this->postJson('/api/bot/brief-orders', $this->botPayload())->assertStatus(403);
        $this->postJson('/api/bot/brief-orders', $this->botPayload(), ['X-Bot-Secret' => 'wrong'])->assertStatus(403);
    }

    public function test_bot_disabled_without_configured_secret(): void
    {
        config(['services.bot.secret' => null]);
        $this->postJson('/api/bot/brief-orders', $this->botPayload(), ['X-Bot-Secret' => ''])->assertStatus(403);
    }

    public function test_bot_creates_short_order_with_token_and_prefill_works(): void
    {
        config(['services.bot.secret' => 'secret-secret-secret-secret-secret-1']);
        $res = $this->postJson('/api/bot/brief-orders', $this->botPayload(), ['X-Bot-Secret' => 'secret-secret-secret-secret-secret-1'])
            ->assertStatus(201)->json();

        $this->assertSame(40, strlen($res['token']));
        $this->assertStringContainsString('/brief?t=' . $res['token'], $res['url']);
        $this->assertDatabaseHas('brief_orders', ['id' => $res['id'], 'source' => 'telegram', 'brief_completed' => false]);

        $this->getJson('/api/brief-orders/prefill/' . $res['token'])
            ->assertOk()
            ->assertJson(['contact_person' => 'Иван, +79991234567'])
            ->assertJsonPath('additional_wishes', "Задача: Нужен интернет-магазин\nБюджет: 300 тыс\nСрок: 2 месяца");

        $this->getJson('/api/brief-orders/prefill/unknown')->assertStatus(404);
    }

    public function test_full_brief_with_token_completes_same_order_once(): void
    {
        config(['services.bot.secret' => 'secret-secret-secret-secret-secret-1']);
        $res = $this->postJson('/api/bot/brief-orders', $this->botPayload(), ['X-Bot-Secret' => 'secret-secret-secret-secret-secret-1'])->json();

        $this->postJson('/api/brief-orders', $this->briefPayload(['token' => $res['token']]))->assertStatus(201);

        $this->assertSame(1, BriefOrder::count());
        $order = BriefOrder::first();
        $this->assertTrue($order->brief_completed);
        $this->assertNull($order->token);
        $this->assertSame('ООО Ромашка', $order->company_name);
        $this->assertSame(123456, (int) $order->telegram_id);

        // токен одноразовый
        $this->getJson('/api/brief-orders/prefill/' . $res['token'])->assertStatus(404);
        $this->postJson('/api/brief-orders', $this->briefPayload(['token' => $res['token']]))->assertStatus(201);
        $this->assertSame(2, BriefOrder::count());
    }

    public function test_brief_without_token_creates_site_order(): void
    {
        $this->postJson('/api/brief-orders', $this->briefPayload())->assertStatus(201);
        $this->assertDatabaseHas('brief_orders', ['source' => 'site', 'brief_completed' => true]);
    }
}
