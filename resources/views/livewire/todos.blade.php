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
            @include('includes.todo', $todo)
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
