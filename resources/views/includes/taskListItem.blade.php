<div class="card">
    <div class="card-header shadow-sm d-flex justify-content-between align-items-center" id="heading{{ $task->id }}">
        <div>
            {{--
            <input 
                type="checkbox" 
                class="mr-3" 
                wire:change="toggleCompleted({{ $todo->id }})" 
                {{ $todo->completed ? 'checked' : '' }}
                title="Mark as {{ $todo->completed ? 'undone' : 'done' }}"
                style="cursor: pointer;"
            >--}}
        </div>
        <h2 class="mb-0">
            <button 
                class="btn btn-link" 
                type="button" 
                data-toggle="collapse" 
                data-target="#collapse{{ $task->id }}" 
                aria-expanded="false" 
                aria-controls="collapse{{ $task->id }}"
                style="{{ $task->status == 0 ? 'text-decoration: line-through' : '' }}"
                title="Show task details"
            >
                {{ $task->title }}
            </button>
        </h2>
        <div style="min-width: 65px; margin-left: 10px;">
            <button 
                type="button" 
                class="btn btn-sm btn-primary" 
                wire:click="openEditing({{ $task->id }})"
                title="Edit"
            >
                <i class="fas fa-edit"></i>
            </button>

            <button 
                class="btn btn-sm btn-danger" 
                onclick="confirm('Are you sure?') || event.stopImmediatePropagation()"
                wire:click="deleteTask({{ $task->id }})"
                title="Delete"
            >
                <i class="far fa-trash-alt"></i>
            </button>


        </div>
    </div>

    <div 
        id="collapse{{ $task->id }}" 
        class="collapse hide" 
        aria-labelledby="heading{{ $task->id }}" 
        data-parent="#taskAccordion"
    >
        <div class="card-body d-flex justify-content-between align-items-center">
            <div>
                {{ $task->description }}
            </div>
        </div>
    </div>
</div>