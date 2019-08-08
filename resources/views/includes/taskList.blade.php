<div class="card d-flex justify-content-between shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
        <div>Tasks</div>        
        <div>
            <button 
                class="btn btn-sm btn-primary"
                wire:click="openAdding"
                title="Add new task"
            >
                <i class="fas fa-plus"></i>
            </button>
        </div>
    </div>
</div>

<div class="accordion mt-4 shadow-sm" id="taskAccordion">
    @foreach($tasks as $task)
        @include('includes.taskListItem', $task)
    @endforeach
</div>