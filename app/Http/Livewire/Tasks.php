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
        ['value' => 3, 'label' => 'In production', 'class' => 'secondary'],
        ['value' => 4, 'label' => 'Has obstacle', 'class' => 'warning'],
        ['value' => 5, 'label' => 'Hurry up', 'class' => 'danger'],
        ['value' => 0, 'label' => 'Completed', 'class' => 'success']
    ];

    public $mode = null;

    public $sortableFields = [
        ['value' => 0, 'name' => 'status'],
        ['value' => 1, 'name' => 'title'],
        ['value' => 2, 'name' => 'description'],
        ['value' => 3, 'name' => 'user_id'],
        ['value' => 4, 'name' => 'created_at'],
        ['value' => 5, 'name' => 'updated_at']
    ];

    public $sortDirections = [
        ['value' => 0, 'name' => 'asc'],
        ['value' => 1, 'name' => 'desc']
    ];

    public $sortBy = 0;
    public $sortDir = 1;

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

    public function resetTask()
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

        $this->resetTask();
    }

    public function deleteTask($id)
    {
        Task::find($id)->delete();
    }

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

        $this->resetTask();
    }

    public function render()
    {
        /*
        $tasks = auth()->user()->tasks->sortBy($this->sortableFields[$this->sortBy]['name']);
        if($this->sortDir == 1) {
            $tasks = $tasks->reverse();
        }
        */

        /*
        $tasks = Task::where('user_id', auth()->user()->id)
            ->orderBy($this->sortableFields[$this->sortBy]['name'], $this->sortDirections[$this->sortDir]['name'])
            ->paginate(10);
        */

        $tasks = Task::orderBy($this->sortableFields[$this->sortBy]['name'], $this->sortDirections[$this->sortDir]['name'])->get();

        return view('livewire.tasks', ['tasks' => $tasks]);
    }
}