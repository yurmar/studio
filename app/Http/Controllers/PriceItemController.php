<?php

namespace App\Http\Controllers;

use App\Models\PriceItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PriceItemController extends Controller
{
    private const RULES = [
        'title' => 'required|string|max:255',
        'icon' => 'nullable|string|max:100',
        'price' => 'required|string|max:100',
        'term' => 'required|string|max:100',
        'description' => 'nullable|string',
        'sort_order' => 'nullable|integer',
    ];

    public function index(): JsonResponse
    {
        return response()->json(PriceItem::orderBy('sort_order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        return response()->json(PriceItem::create($request->validate(self::RULES)), 201);
    }

    public function update(Request $request, PriceItem $priceItem): JsonResponse
    {
        $priceItem->update($request->validate(self::RULES));

        return response()->json($priceItem);
    }

    public function destroy(PriceItem $priceItem): JsonResponse
    {
        $priceItem->delete();

        return response()->json(null, 204);
    }
}
