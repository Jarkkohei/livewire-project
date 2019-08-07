<div>
    @switch($mode)

        @case('add')
            @include('includes.addTodo')
            @break

        @case('edit')
            @include('includes.editTodo')
            @break

        @default
            @include('includes.todoList')
    @endswitch
</div>