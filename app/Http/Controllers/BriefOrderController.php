<?php

namespace App\Http\Controllers;

use App\Mail\BriefOrderReceived;
use App\Models\BriefOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class BriefOrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'contact_person'         => 'required|string|max:500',
            'company_name'           => 'required|string|max:500',
            'company_activity'       => 'required|string',
            'products_info'          => 'required|string',
            'site_sections'          => 'required|string',
            'brand_style'            => 'required|string',
            'current_site'           => 'nullable|string|max:500',
            'current_site_assessment'=> 'nullable|string',
            'competitors'            => 'nullable|string',
            'proposed_domain'        => 'nullable|string|max:500',
            'site_types'             => 'required|array|min:1',
            'site_type_other'        => 'nullable|string|max:500',
            'site_tasks'             => 'required|array|min:1',
            'site_tasks_other'       => 'nullable|string|max:500',
            'site_functionality'     => 'nullable|array',
            'site_functionality_other' => 'nullable|string|max:500',
            'target_audience'        => 'required|string',
            'language_versions'      => 'required|string|max:500',
            'design_impression'      => 'required|string',
            'color_scheme'           => 'required|string|max:500',
            'content_placement'      => 'required|string|max:500',
            'liked_sites'            => 'nullable|string',
            'disliked_sites'         => 'nullable|string',
            'has_advertising'        => 'required|string|max:100',
            'advertising_details'    => 'nullable|string',
            'hosting_type'           => 'required|string|max:200',
            'tech_support'           => 'required|string',
            'content_filling'        => 'required|string|max:200',
            'additional_wishes'      => 'nullable|string',
            'token'                  => 'nullable|string|max:64',
        ]);

        $data['site_functionality'] ??= [];
        $token = $data['token'] ?? null;
        unset($data['token']);

        // Бриф по ссылке из бота дополняет короткую заявку, а не создаёт новую
        $order = $token
            ? BriefOrder::where('token', $token)->where('brief_completed', false)->first()
            : null;

        if ($order) {
            $order->update($data + ['brief_completed' => true, 'token' => null]);
        } else {
            $order = BriefOrder::create($data);
        }

        try {
            $to = env('MAIL_NOTIFICATION_TO', 'yurmarchuk@gmail.com');
            Mail::to($to)->send(new BriefOrderReceived($order));
        } catch (\Throwable) {
            // Письмо не критично — заказ уже сохранён
        }

        return response()->json(['message' => 'Запрос успешно отправлен', 'id' => $order->id], 201);
    }

    /** Короткая заявка из Telegram-бота (по секрету бота). */
    public function storeFromBot(Request $request)
    {
        $secret = (string) config('services.bot.secret');
        if ($secret === '' || !hash_equals($secret, (string) $request->header('X-Bot-Secret'))) {
            abort(403);
        }

        $data = $request->validate([
            'contact_person'    => 'required|string|max:500',
            'task_description'  => 'required|string|max:5000',
            'budget'            => 'nullable|string|max:200',
            'deadline'          => 'nullable|string|max:200',
            'telegram_id'       => 'required|integer',
            'telegram_username' => 'nullable|string|max:100',
        ]);

        $token = Str::random(40);

        // Обязательные колонки полного брифа в короткой заявке остаются пустыми
        $order = BriefOrder::create($data + [
            'source'          => 'telegram',
            'token'           => $token,
            'brief_completed' => false,
            'company_name' => '', 'company_activity' => '', 'products_info' => '',
            'site_sections' => '', 'brand_style' => '', 'target_audience' => '',
            'language_versions' => '', 'design_impression' => '', 'color_scheme' => '',
            'content_placement' => '', 'has_advertising' => '', 'hosting_type' => '',
            'tech_support' => '', 'content_filling' => '',
            'site_types' => [], 'site_tasks' => [], 'site_functionality' => [],
        ]);

        return response()->json([
            'id'    => $order->id,
            'token' => $token,
            'url'   => rtrim(config('app.url'), '/') . '/brief?t=' . $token,
        ], 201);
    }

    /** Данные для предзаполнения формы /brief по токену из бота. */
    public function prefill(string $token)
    {
        $order = BriefOrder::where('token', $token)->where('brief_completed', false)->first();
        if (!$order) {
            return response()->json(['message' => 'Ссылка недействительна'], 404);
        }

        $wishes = array_filter([
            'Задача: ' . $order->task_description,
            $order->budget ? 'Бюджет: ' . $order->budget : null,
            $order->deadline ? 'Срок: ' . $order->deadline : null,
        ]);

        return response()->json([
            'contact_person'   => $order->contact_person,
            'additional_wishes' => implode("\n", $wishes),
        ]);
    }

    public function index()
    {
        $orders = BriefOrder::latest()->get();
        return response()->json($orders);
    }

    public function show(BriefOrder $briefOrder)
    {
        return response()->json($briefOrder);
    }
}
