<div>
    <div class="card d-flex flex-column justify-content-between">

        <div class="card-header">Add new todo</div>

        <div class="card-body">
            <div class="form-group">
                <label for="addTodoTitle">Title</label>
                <input 
                    id="addTodoTitle"
                    name="addTodoTitle"
                    type="text"
                    class="form-control form-control-lg {{ $errors->has('title') ? 'border border-danger' : '' }}"
                    placeholder="Title..."
                    value=""
                    aria-describedby="titleErrors"
                    wire:model="title"
                >

                @if($errors->has('title'))
                    <small id="titleErrors" class="form-text text-danger">{{ $errors->first('title') }}</small>
                @endif
            </div>

            <div class="form-group">
                <label for="addTodoDescription">Description</label>
                <textarea 
                    id="addTodoDescription"
                    name="addTodoDescription"
                    class="form-control form-control-lg {{ $errors->has('description') ? 'border border-danger' : $title }}"
                    placeholder="Description..."
                    rows="5"
                    value="{{ $errors->has('description') ? old('addTodoDescription') : $description }}"
                    wire:model="description"
                    aria-describedby="descriptionErrors"
                ></textarea>

                @if($errors->has('description'))
                    <small id="descriptionErrors" class="form-text text-danger">{{ $errors->first('description') }}</small>
                @endif
            </div>

            <div class="form-group">
                <button 
                    class="btn btn-primary form-control" 
                    wire:click="addTodo" 
                    type="submit"
                    title="Add new Todo"
                >
                    Add
                </button>
            </div>
        </div>
    </div>

    <div class="accordion  mt-4" id="todoAccordion">
        @foreach($todos as $todo)
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center" id="heading{{ $todo->id }}">
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
                        <button 
                            class="btn btn-sm btn-primary" 
                            onclick="updateTodoPrompt('title', '{{ $todo->title }}') || event.stopImmediatePropagation()"
                            wire:click="updateTodo({{ $todo->id }}, updatedTodoTitle, {{ $todo->description }})"
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
                        <div>
                            <button 
                                class="btn btn-sm btn-primary" 
                                onclick=""
                                wire:click=""
                                title="Edit"
                            >
                                <i class="fas fa-edit"></i>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <script>
        let updatedTodo = '';

        function updateTodoPrompt(title) {
            event.preventDefault();
            updatedTodo = '';
            const todo = prompt("Update Todo", title);

            if(todo == null || todo.trim() == '') {
                updatedTodo = '';
                return false;
            }

            updatedTodo = todo;
            return true;
        }
    </script>
</div>
