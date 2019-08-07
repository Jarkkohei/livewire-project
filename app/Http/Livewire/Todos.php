<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Todo;

class Todos extends Component
{
    public $id = null;
    public $title = '';
    public $description = '';

    public $mode = null;

    public function openEditing($id)
    {
        $todo = Todo::find($id);

        $this->id = $todo->id;
        $this->title = $todo->title;
        $this->description = $todo->description;
        $this->mode = 'edit';
    }

    public function openAdding()
    {
        $this->mode = 'add';
    }

    public function resetPage()
    {
        $this->id = null;
        $this->title = '';
        $this->description = '';
        $this->mode = null;
    }

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

        $this->resetPage();
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

    public function updateTodo()
    {
        $this->validate([
            'title' => 'required'
        ]);

        $todo = Todo::find($this->id);

        $todo->title = $this->title;
        $todo->description = $this->description;
        $todo->save();

        $this->resetPage();
    }

    public function render()
    {
        return view('livewire.todos', [
            'todos' => auth()->user()->todos->sortBy('completed')
        ]);
    }
}
