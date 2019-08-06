<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use SoftDeletes;

    protected $fillable = ['user_id', 'title', 'description', 'completed'];

    public function user()
    {
        $this->belongTo('App\User');
    }
}
