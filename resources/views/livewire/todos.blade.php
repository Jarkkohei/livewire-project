<div>
    @if($mode == 'add')
        @include('includes.addTodo')
    @elseif($mode == 'edit')
        @include('includes.editTodo')
    @else
        <div class="card d-flex justify-content-between shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>Todos</div>        
                <div>
                    <button 
                        class="btn"
                        wire:click="$set('mode', 'add')"
                    >
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="accordion mt-4 shadow-sm" id="todoAccordion">
            @foreach($todos as $todo)
                @include('includes.todoListItem', $todo)
            @endforeach
        </div>
    @endif

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