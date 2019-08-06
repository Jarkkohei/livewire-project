<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Todo;

class Todos extends Component
{
    public $title = '';
    public $description = '';

    public function addTodo()
    {
        $this->validate([
            'title' => 'required'
        ]);

        Todo::create([
            'user_id' => auth()->id(),
            'title' => $this->title,
            'description' => $this->description,
            'completed' => false
        ]);

        $this->title = '';
        $this->description = '';
    }

    public function deleteTodo($id)
    {
        Todo::find($id)->delete();
    }

    public function toggleCompleted($id)
    {
        $todo = Todo::find($id);

        $todo->completed = !$todo->completed;
        $todo->save();
    }

    public function updateTodo($id)
    {
        $todo = Todo::find($id);

        $todo->title = $this->title;
        $todo->description = $this->description;
        $todo->save();
    }

    public function render()
    {
        return view('livewire.todos', [
            'todos' => auth()->user()->todos
        ]);
    }
}
