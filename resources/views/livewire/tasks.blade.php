<div class="container">
    <div class="row">

        <div class="col-12 col-lg-4 col-xl-3 mt-3">
            <div class="card shadow-sm">

                <div class="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                    <div>Projects</div>        
                </div>

                <div class="card-body d-flex justify-content-start flex-column p-0 projectsListCardBody">
                    @foreach($projects as $project)
                        <div 
                            class="projectsListItem {{ $project['id'] == $currentProjectId ? 'active' : '' }}" 
                            title="{{ $project['description'] }}"
                            wire:click="setCurrentProjectId({{ $project['id'] }})"
                        >
                            {{ $project['title'] }}
                        </div>
                    @endforeach
                </div>
            </div>

        </div>


        <div class="col-12 col-lg-8 col-xl-9 mt-3">
            <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div>Tasks</div>        
                    <div>
                        <button 
                            class="btn btn-sm btn-primary"
                            wire:click="create"
                            title="Add new task"
                        >
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-lg-6">
                    @include('includes.sortTasks')
                </div>
                <div class="col-12 col-lg-6">
                    @include('includes.filterTasks')
                </div>
            </div>

            @if(count($tasks))
                @include('includes.paginateTasks')
            @endif

            <div class="accordion mt-3 shadow-sm" id="taskAccordion">
                @forelse($tasks as $task)
                    @include('includes.taskListItem', $task)
                @empty
                    <p>No tasks to show</p>
                @endforelse
            </div>

            @if(count($tasks))
                @include('includes.paginateTasks')
            @endif

        </div>
    </div>
</div>
