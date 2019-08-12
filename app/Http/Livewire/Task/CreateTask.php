<?php

namespace App\Http\Livewire\Task;

use Livewire\Component;
use App\Task;

class CreateTask extends Component
{
    public $title = '';
    public $description = '';

    protected function reset()
    {
        $this->title = '';
        $this->description = '';
    }

    public function back()
    {
        $this->reset();
        $this->redirect('/tasks');
    }

    public function create()
    {
        $this->validate([
            'title' => 'required',
        ]);

        Task::create([
            'user_id' => auth()->id(),
            'title' => $this->title,
            'description' => $this->description,
            'status' => 2
        ]);

        $this->back();
    }

    public function render()
    {
        return view('livewire.task.create-task');
    }
}
