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

    public $itemsCount = null;
    public $itemsPerPageOptions = [10, 25, 50, 100];

    public $currentPageNumber = 1;
    public $itemsPerPage = 10;
    public $pagesCount = null;

    public function showPage($index)
    {
        $this->currentPageNumber = $index;
    }

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

    public function setPagesCount()
    {
        if($this->itemsCount == 0) {
            //$errors->noTasks = 'No tasks found';
            //$errors['noTasks'] = 'No tasks found';
        } else {
            if($this->itemsCount <= $this->itemsPerPage) {
                // All items can be shown on the first page
                $this->pagesCount = 1;
            } else if($this->itemsCount % $this->itemsPerPage == 0) {
                // All pages are full
                $this->pagesCount = floor($this->itemsCount / $this->itemsPerPage);
            } else {
                // Last page is not full
                $this->pagesCount = floor($this->itemsCount / $this->itemsPerPage) + 1;
            }
        }
    }

    public function render()
    {
        $collection = Task::orderBy($this->sortableFields[$this->sortBy]['name'], $this->sortDirections[$this->sortDir]['name']);

        $this->itemsCount = $collection->count();
        //print_r($itemsCount);

        $this->setPagesCount();

        $chunk = $collection->forPage($this->currentPageNumber, $this->itemsPerPage);
        $tasks = $chunk->get();

        return view('livewire.tasks', ['tasks' => $tasks]);
    }
}