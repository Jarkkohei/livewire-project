<div>
    @if($mode == 'add')
        @include('includes.addTodo')
    @else
        <div class="">
            <button 
                class="btn btn-primary"
                wire:click="$set('mode', 'add')"
            >
                Add
            </button>
        </div>
    @endif

    @if($mode == 'edit')
        @include('includes.editTodo')
    @endif

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