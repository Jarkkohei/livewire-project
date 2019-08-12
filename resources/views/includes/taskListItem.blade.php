<div class="card taskListItem">
    <div class="card-header shadow-sm d-flex justify-content-between align-items-center px-2 px-md-3" id="heading-{{ $task['id'] }}">
        <div class="text-center" style="min-width: 30px; max-width: 30px;">
            @switch($task['status'])
                @case(0)
                    <i class="fas fa-check-circle fa-lg text-success" title="Completed" style="cursor: pointer;"></i>
                    @break
                @case(1)
                    <i class="fas fa-rocket fa-lg text-primary" title="Created" style="cursor: pointer;"></i>
                    @break
                @case(2)
                    <i class="fas fa-user-circle fa-lg text-secondary" title="Assigned" style="cursor: pointer;"></i>
                    @break
                @case(3)
                    <i class="fas fa-industry fa-lg text-secondary" title="In production" style="cursor: pointer;"></i>
                    @break
                @case(4)
                    <i class="fas fa-ban fa-lg text-secondary" title="Blocked" style="cursor: pointer;"></i>
                    @break
                @case(5)
                    <i class="fas fa-exclamation-circle fa-lg" title="Burn in" style="cursor: pointer; color: orange;"></i>
                    @break
                @case(6)
                    <i class="fas fa-fire fa-lg text-danger" title="Hurry Up!" style="cursor: pointer;"></i>
                    @break
            @endswitch
        </div>
        <h2 class="mb-0">
            <button 
                class="btn btn-link" 
                type="button" 
                data-toggle="collapse" 
                data-target="#collapse-{{ $task['id'] }}" 
                aria-expanded="false" 
                aria-controls="collapse-{{ $task['id'] }}"
                style="{{ $task['status'] == 0 ? 'text-decoration: line-through' : '' }}"
                title="Show task details"
            >
                {{ $task['title'] }}
            </button>
        </h2>
        <div style="min-width: 65px; margin-left: 10px;">
            <button 
                type="button" 
                class="btn btn-sm btn-primary" 
                wire:click="openEditing({{ $task['id'] }})"
                title="Edit"
            >
                <i class="fas fa-edit"></i>
            </button>

            <button 
                class="btn btn-sm btn-danger" 
                onclick="confirm('Are you sure?') || event.stopImmediatePropagation()"
                wire:click="deleteTask({{ $task['id'] }})"
                title="Delete"
            >
                <i class="far fa-trash-alt"></i>
            </button>


        </div>
    </div>

    <div 
        id="collapse-{{ $task['id'] }}" 
        class="collapse hide" 
        aria-labelledby="heading-{{ $task['id'] }}" 
        data-parent="#taskAccordion"
    >
        <div class="card-body d-flex justify-content-between align-items-center">
            <div>
                {{ $task['description'] }}
            </div>
        </div>
    </div>
</div>