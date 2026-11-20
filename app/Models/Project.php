<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'stack', 'description',
        'screenshot_path', 'url', 'is_active', 'is_featured', 'is_concept', 'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_concept' => 'boolean',
        'is_active' => 'boolean',
    ];
}
