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

<div class="row">
    <div class="col-12 col-lg-4 col-xl-3 order-lg-12">
        @include('includes.sortTasks')
        @include('includes.filterTasks')
    </div>

    <div class="col-12 col-lg-8 col-xl-9">
        @include('includes.paginateTasks')

        <div class="accordion mt-2 shadow-sm" id="taskAccordion">
            @foreach($tasks as $task)
                @include('includes.taskListItem', $task)
            @endforeach
        </div>

        @include('includes.paginateTasks')
    </div>
</div>
