<?php

namespace App\Http\Controllers;

use App\Models\ConceptContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Правки текстов и картинок лендингов-концептов (/concepts/<slug>/).
 * Читать может любой, писать — только авторизованный администратор.
 */
class ConceptContentController extends Controller
{
    private const SLUG = '/^[a-z0-9-]{1,64}$/';

    public function index(string $slug): JsonResponse
    {
        abort_unless(preg_match(self::SLUG, $slug), 404);

        return response()->json(
            (object) ConceptContent::where('slug', $slug)->pluck('value', 'key')->all()
        );
    }

    public function update(Request $request, string $slug): JsonResponse
    {
        abort_unless(preg_match(self::SLUG, $slug), 404);

        $data = $request->validate([
            'values' => 'required|array|max:200',
            'values.*' => 'nullable|string|max:5000',
        ]);

        foreach ($data['values'] as $key => $value) {
            abort_unless(preg_match('/^[A-Za-z0-9._-]{1,128}$/', (string) $key), 422, 'Недопустимый ключ');

            if ($value === null) {
                ConceptContent::where(['slug' => $slug, 'key' => $key])->delete();
            } else {
                ConceptContent::updateOrCreate(['slug' => $slug, 'key' => $key], ['value' => $value]);
            }
        }

        return $this->index($slug);
    }
}
