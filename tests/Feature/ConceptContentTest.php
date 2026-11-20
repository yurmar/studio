<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ConceptContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_reads_but_cannot_write(): void
    {
        $this->getJson('/api/concepts/zerno-i-par/content')->assertOk()->assertExactJson([]);
        $this->putJson('/api/concepts/zerno-i-par/content', ['values' => ['a' => 'b']])->assertStatus(401);
    }

    public function test_admin_saves_and_resets_values(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $this->putJson('/api/concepts/zerno-i-par/content', ['values' => ['hero.title' => 'Новый']])
            ->assertOk()->assertJson(['hero.title' => 'Новый']);
        $this->putJson('/api/concepts/zerno-i-par/content', ['values' => ['hero.title' => null]])
            ->assertOk()->assertExactJson([]);
    }

    public function test_bad_slug_is_404(): void
    {
        $this->getJson('/api/concepts/Bad_Slug/content')->assertNotFound();
    }
}
