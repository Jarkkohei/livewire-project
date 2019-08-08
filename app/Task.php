<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $fillable = ['user_id', 'title', 'description', 'status'];

    public function user()
    {
        $this->belongTo('App\User');
    }
}
