<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Task;

class Tasks extends Component
{
    public $id = null;
    public $title = '';
    public $description = '';

    public $mode = null;

    public function openEditing($id)
    {
        $task = Task::find($id);

        $this->id = $task->id;
        $this->title = $task->title;
        $this->description = $task->description;
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

    public function addTask()
    {
        $this->validate([
            'title' => 'required'
        ]);

        Task::create([
            'user_id' => auth()->id(),
            'title' => $this->title,
            'description' => $this->description,
            'status' => 1
        ]);

        $this->resetPage();
    }

    public function deleteTask($id)
    {
        Task::find($id)->delete();
    }

    /*
    public function toggleCompleted($id)
    {
        $todo = Todo::find($id);

        $todo->completed = !$todo->completed;
        $todo->save();
    }
    */

    public function updateTask()
    {
        $this->validate([
            'title' => 'required'
        ]);

        $task = Task::find($this->id);

        $task->title = $this->title;
        $task->description = $this->description;
        $task->save();

        $this->resetPage();
    }

    public function render()
    {
        return view('livewire.tasks', [
            'tasks' => auth()->user()->tasks->sortByDesc('status')
        ]);
    }
}