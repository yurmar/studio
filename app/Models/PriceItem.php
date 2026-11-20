<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PriceItem extends Model
{
    protected $fillable = ['title', 'icon', 'price', 'term', 'description', 'sort_order'];
}
