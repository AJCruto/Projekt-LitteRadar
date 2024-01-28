<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GarbageBin extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'longitude',
        'latitude',
        'prev_lon',
        'prev_lat',
        'is_moving',
        'distance',
        'moved_at'
    ];
}
