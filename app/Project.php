<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'description', 'parent_id', 'level'];

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function tasks()
    {
        return $this->hasMany('App\Task')->orderBy('status', 'desc');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id')->with('parent');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id')->with('children')->orderBy('title', 'asc');
    }
}
