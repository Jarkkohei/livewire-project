<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Task;

class Tasks extends Component
{
    public $id = null;
    public $title = '';
    public $description = '';
    public $status = null;

    public $taskStatuses = [
        ['value' => 1, 'label' => 'Created', 'class' => 'light'],
        ['value' => 2, 'label' => 'Assigned', 'class' => 'info'],
        ['value' => 3, 'label' => 'Production', 'class' => 'secondary'],
        ['value' => 4, 'label' => 'Has obstacle', 'class' => 'warning'],
        ['value' => 5, 'label' => 'Hurry up', 'class' => 'danger'],
        ['value' => 0, 'label' => 'Completed', 'class' => 'success']
    ];

    public $mode = null;

    public function openEditing($id)
    {
        $task = Task::find($id);

        $this->id = $task->id;
        $this->title = $task->title;
        $this->description = $task->description;
        $this->status = $task->status;
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
        $this->status = null;
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
            'status' => 2
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

    public function setTaskStatus($id) 
    {
        $task = Task::find($id);

        $task->status = $this->status;
        $task->save();

    }

    public function updateTask()
    {
        $this->validate([
            'title' => 'required',
            'status' => 'required|integer|min:0|max:5'
        ]);

        $task = Task::find($this->id);

        $task->title = $this->title;
        $task->description = $this->description;
        $task->status = $this->status;
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