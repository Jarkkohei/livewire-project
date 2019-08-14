<?php

namespace App\Http\Livewire\Task;

use Livewire\Component;
use App\Task;
use App\Project;

class CreateTask extends Component
{
    public $title = '';
    public $description = '';
    public $status = 1;
    public $projectId = null;

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
        $this->title = '';
        $this->description = '';
        $this->status = 2;
        $this->projectId = null;
    }

    public function back()
    {
        $this->reset();
        $this->redirect('/tasks');
    }

    public function create()
    {
        //TODO: Add proper validation for projectId (is present in projects-table jne.)
        $this->validate([
            'title' => 'required',
            'status' => 'required|integer|min:0|max:6',
            'projectId' => 'required|integer|min:1'
        ]);

        Task::create([
            'user_id' => auth()->id(),
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'project_id' => $this->projectId
        ]);

        $this->back();
    }

    public function render()
    {
        $projects = Project::all();

        return view('livewire.task.create-task', [
            'projects' => $projects
        ]);
    }
}
