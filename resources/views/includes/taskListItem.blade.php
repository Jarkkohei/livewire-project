<div class="card taskListItem">
    <div class="card-header shadow-sm d-flex justify-content-between align-items-center px-2 px-md-3" id="heading-{{ $task['id'] }}">
        <div class="text-center" style="min-width: 30px; max-width: 30px;">
            @foreach($taskStatuses as $taskStatus)
                @if($taskStatus['value'] == $task['status'])
                    <i 
                        class="{{ $taskStatus['classes'] }} {{ $taskStatus['colorClass'] }}" 
                        title="{{ $taskStatus['label'] }}"
                        style="cursor: pointer; {{ $taskStatus['styles'] }}"
                    ></i>
                @endif
            @endforeach
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
                wire:click="edit({{ $task['id'] }})"
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