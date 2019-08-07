<div>
    @if($mode == 'add')
        @include('includes.addTodo')
    @elseif($mode == 'edit')
        @include('includes.editTodo')
    @else
        @include('includes.todoList')
    @endif
</div>