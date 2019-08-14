<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'description', 'parent_id', 'level'];

    public function user()
    {
        return $this->belongTo('App\User');
    }

    public function tasks()
    {
        return $this->hasMany('App\Task');
    }
}
