<div class="card d-flex justify-content-between shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
        <div>Todos</div>        
        <div>
            <button 
                class="btn btn-sm btn-primary"
                wire:click="openAdding"
                title="Add new todo"
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