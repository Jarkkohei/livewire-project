<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Task;

class Tasks extends Component
{
    public function edit($id)
    {
        $this->redirect('/task/'. $id . '/edit');
    }

    public function create()
    {
        $this->redirect('/task/create');
    }

    public $taskStatuses = [
        ['value' => 1, 'label' => 'Created', 'classes' => 'fas fa-rocket fa-lg', 'colorClass' => 'text-primary', 'styles' => '', 'included' => 'true'],
        ['value' => 2, 'label' => 'Assigned', 'classes' => 'fas fa-user-circle fa-lg', 'colorClass' => 'text-secondary', 'styles' => '', 'included' => 'true'],
        ['value' => 3, 'label' => 'In production', 'classes' => 'fas fa-industry fa-lg', 'colorClass' => 'text-secondary', 'styles' => '', 'included' => 'true'],
        ['value' => 4, 'label' => 'Blocked', 'classes' => 'fas fa-ban fa-lg', 'colorClass' => 'text-secondary', 'styles' => '', 'included' => 'true'],
        ['value' => 5, 'label' => 'Burn in', 'classes' => 'fas fa-exclamation-circle fa-lg', 'colorClass' => '', 'styles' => 'color: orange', 'included' => 'true'],
        ['value' => 6, 'label' => 'Hurry up', 'classes' => 'fas fa-fire fa-lg', 'colorClass' => 'text-danger', 'styles' => '', 'included' => 'true'],
        ['value' => 0, 'label' => 'Completed', 'classes' => 'fas fa-check-circle fa-lg', 'colorClass' => 'text-success', 'styles' => '', 'included' => 'true']
    ];

    //public $mode = null;

    public $sortableFields = [
        ['value' => 0, 'label' => 'status'],
        ['value' => 1, 'label' => 'title'],
        ['value' => 2, 'label' => 'description'],
        ['value' => 3, 'label' => 'user_id'],
        ['value' => 4, 'label' => 'created_at'],
        ['value' => 5, 'label' => 'updated_at']
    ];

    public $sortDirections = [
        ['value' => 0, 'label' => 'asc'],
        ['value' => 1, 'label' => 'desc']
    ];

    public $sortBy = 0;
    public $sortDir = 1;

    public $itemsCount = null;
    public $filteredItemsCount = null;
    public $itemsPerPageOptions = [5, 10, 25, 50, 100];

    public $currentPageNumber = 1;
    public $itemsPerPage = 10;
    public $pagesCount = null;


    public function toggleFilter($index)
    {
        $this->taskStatuses[$index]['included'] = !$this->taskStatuses[$index]['included'];
        $this->currentPageNumber = 1;
    }

    public function showPage($index)
    {
        $this->currentPageNumber = $index;
    }

    public function deleteTask($id)
    {
        Task::find($id)->delete();
    }

    public function setPagesCount()
    {
        if($this->filteredItemsCount == 0) {
            //$errors->noTasks = 'No tasks found';
            //$errors['noTasks'] = 'No tasks found';
        } else {
            if($this->filteredItemsCount <= $this->itemsPerPage) {
                // All items can be shown on the first page
                $this->pagesCount = 1;
            } else if($this->filteredItemsCount % $this->itemsPerPage == 0) {
                // All pages are full
                $this->pagesCount = floor($this->filteredItemsCount / $this->itemsPerPage);
            } else {
                // Last page is not full
                $this->pagesCount = floor($this->filteredItemsCount / $this->itemsPerPage) + 1;
            }
        }
    }

    public function render()
    {
        $collection = Task::orderBy($this->sortableFields[$this->sortBy]['label'], $this->sortDirections[$this->sortDir]['label'])->get();

        $this->itemsCount = $collection->count();

        $filtered = $collection->filter(function($value, $key) {
            $statusIncluded = false;

            foreach($this->taskStatuses as $taskStatus) {
                if($taskStatus['value'] == $value['status']) {
                    $statusIncluded = $taskStatus['included'] == true;
                    continue;
                }
            }
            return $statusIncluded;
            
        });

        $this->filteredItemsCount = $filtered->count();

        $this->setPagesCount();

        $tasks = $filtered->forPage($this->currentPageNumber, $this->itemsPerPage);

        return view('livewire.tasks', ['tasks' => $tasks]);
    }
}