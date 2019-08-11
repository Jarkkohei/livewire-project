<div class="container">
    @switch($mode)

        @case('add')
            @include('includes.addTask')
            @break

        @case('edit')
            @include('includes.editTask')
            @break

        @default
            @include('includes.taskList')
    @endswitch
</div>
