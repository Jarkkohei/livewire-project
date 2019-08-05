<div>
    <div class="input-group d-flex">
        <input 
            id="addTodo"
            name="addTodo"
            type="text"
            class="form-control form-control-lg"
            placeholder="What needs to be done?"
            value="{{ old('addTodo') }}"
            wire:model.lazy="title"
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
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <input 
                        type="checkbox" 
                        class="mr-4" 
                        wire:change="toggleCompleted({{ $todo->id }})" 
                        {{ $todo->completed ? 'checked' : '' }}
                    >
                    <a 
                        href="#" 
                        style="{{ $todo->completed ? 'text-decoration: line-through' : '' }}"
                        onclick="updateTodoPrompt('{{ $todo->title }}') || event.stopImmediatePropagation()"
                        wire:click="updateTodo({{ $todo->id }}, updatedTodo)"
                    >
                        {{ $todo->title }}
                    </a>
                </div>

                <div>
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
