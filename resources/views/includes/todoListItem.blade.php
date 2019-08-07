<div class="card">
    <div class="card-header shadow-sm d-flex justify-content-between align-items-center" id="heading{{ $todo->id }}">
        <div>
            <input 
                type="checkbox" 
                class="mr-3" 
                wire:change="toggleCompleted({{ $todo->id }})" 
                {{ $todo->completed ? 'checked' : '' }}
                title="Mark as {{ $todo->completed ? 'undone' : 'done' }}"
                style="cursor: pointer;"
            >
        </div>
        <h2 class="mb-0">
            <button 
                class="btn btn-link" 
                type="button" 
                data-toggle="collapse" 
                data-target="#collapse{{ $todo->id }}" 
                aria-expanded="false" 
                aria-controls="collapse{{ $todo->id }}" 
                style="{{ $todo->completed ? 'text-decoration: line-through' : '' }}"
            >
                {{ $todo->title }}
            </button>
        </h2>
        <div style="min-width: 65px; margin-left: 10px;">
            {{--
            <button 
                class="btn btn-sm btn-primary" 
                onclick="updateTodoPrompt('title', '{{ $todo->title }}') || event.stopImmediatePropagation()"
                wire:click="updateTodo({{ $todo->id }}, updatedTodoTitle, {{ $todo->description }})"
                title="Edit"
            >
                <i class="fas fa-edit"></i>
            </button>
            --}}

            <button 
                type="button" 
                class="btn btn-sm btn-primary" 
                wire:click="$set('mode', 'edit')"
                title="Edit"
            >
                <i class="fas fa-edit"></i>
            </button>

            <button 
                class="btn btn-sm btn-danger" 
                onclick="confirm('Are you sure?') || event.stopImmediatePropagation()"
                wire:click="deleteTodo({{ $todo->id }})"
                title="Delete"
            >
                <i class="far fa-trash-alt"></i>
            </button>


        </div>
    </div>

    <div 
        id="collapse{{ $todo->id }}" 
        class="collapse hide" 
        aria-labelledby="heading{{ $todo->id }}" 
        data-parent="#todoAccordion"
    >
        <div class="card-body d-flex justify-content-between align-items-center">
            <div>
                {{ $todo->description }}
            </div>
        </div>
    </div>
</div>