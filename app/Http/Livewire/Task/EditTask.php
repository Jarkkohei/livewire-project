<?php

namespace App\Http\Livewire\Task;

use Livewire\Component;
use App\Task;

class EditTask extends Component
{
    public $id = null;
    public $title = '';
    public $description = '';
    public $status = null;

    public $taskStatuses = [
        ['value' => 1, 'label' => 'Created', 'classes' => 'fas fa-rocket fa-lg', 'colorClass' => 'text-primary', 'styles' => '', 'included' => 'true'],
        ['value' => 2, 'label' => 'Assigned', 'classes' => 'fas fa-user-circle fa-lg', 'colorClass' => 'text-secondary', 'styles' => '', 'included' => 'true'],
        ['value' => 3, 'label' => 'In production', 'classes' => 'fas fa-industry fa-lg', 'colorClass' => 'text-secondary', 'styles' => '', 'included' => 'true'],
        ['value' => 4, 'label' => 'Blocked', 'classes' => 'fas fa-ban fa-lg', 'colorClass' => 'text-secondary', 'styles' => '', 'included' => 'true'],
        ['value' => 5, 'label' => 'Burn in', 'classes' => 'fas fa-exclamation-circle fa-lg', 'colorClass' => '', 'styles' => 'color: orange', 'included' => 'true'],
        ['value' => 6, 'label' => 'Hurry up', 'classes' => 'fas fa-fire fa-lg', 'colorClass' => 'text-danger', 'styles' => '', 'included' => 'true'],
        ['value' => 0, 'label' => 'Completed', 'classes' => 'fas fa-check-circle fa-lg', 'colorClass' => 'text-success', 'styles' => '', 'included' => 'true']
    ];

    protected function reset()
    {
        $this->id = null;
        $this->title = '';
        $this->description = '';
        $this->status = null;
    }

    public function back()
    {
        $this->reset();
        $this->redirect('/admin/tasks');
    }

    public function mount($id)
    {
        $task = Task::find($id);

        $this->id = $task->id;
        $this->title = $task->title;
        $this->description = $task->description;
        $this->status = $task->status;
    }

    public function update()
    {
        $this->validate([
            'title' => 'required',
            'status' => 'required|integer|min:0|max:6'
        ]);

        $task = Task::find($this->id);

        $task->title = $this->title;
        $task->description = $this->description;
        $task->status = $this->status;
        $task->save();

        $this->back();
    }

    public function render()
    {
        return view('livewire.task.edit-task', [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
        ]);
    }
}
