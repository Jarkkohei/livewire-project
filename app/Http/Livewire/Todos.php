<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Todo;

class Todos extends Component
{
    public $title = '';

    public function addTodo()
    {
        Todo::create([
            'user_id' => auth()->id(),
            'title' => $this->title,
            'completed' => false
        ]);

        $this->title = '';
    }

    public function render()
    {
        return view('livewire.todos', [
            'todos' => auth()->user()->todos
        ]);
    }
}
