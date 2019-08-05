<div>
    <div class="input-group d-flex">
        <input 
            id="addTodo"
            name="addTodo"
            type="text"
            class="form-control form-control-lg"
            placeholder="New todo..."
            value="{{ old('addTodo') }}"
            wire:model="title"
            style="{{ $errors->has('title') ? 'background-color: #ffcccc' : '' }}"
        >
        <div class="input-group-append">
            <button class="btn btn-primary" wire:click="addTodo" type="submit">Add</button>
        </div>
    </div>

    @if($errors->has('title'))
        <div style="color: red;">{{ $errors->first('title') }}</div>
    @endif

    <ul class="list-group mt-4">
        @foreach($todos as $todo)
            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                <div>
                    <input 
                        type="checkbox" 
                        class="mr-3" 
                        wire:change="toggleCompleted({{ $todo->id }})" 
                        {{ $todo->completed ? 'checked' : '' }}
                    >
                </div>

                <div>
                    <span style="{{ $todo->completed ? 'text-decoration: line-through' : '' }}">
                        {{ $todo->title }}
                    </span>
                </div>

                <div style="min-width: 65px; margin-left: 10px;">
                    <button 
                        class="btn btn-sm btn-primary" 
                        onclick="updateTodoPrompt('{{ $todo->title }}') || event.stopImmediatePropagation()"
                        wire:click="updateTodo({{ $todo->id }}, updatedTodo)"
                    >
                        E
                    </button>

                    <button 
                        class="btn btn-sm btn-danger" 
                        onclick="confirm('Are you sure?') || event.stopImmediatePropagation()"
                        wire:click="deleteTodo({{ $todo->id }})"
                    >
                        &times;
                    </button>
                </div>
            </li>
        @endforeach
    </ul>

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
