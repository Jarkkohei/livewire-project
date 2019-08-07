<div class="card d-flex flex-column justify-content-between shadow-sm">

    <div class="card-header d-flex justify-content-between align-items-center">
        <div>
            Edit todo
        </div>
        <div>
            <button 
                class="btn"
                wire:click="resetPage"
            >
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>

    <div class="card-body">
        <div class="form-group">
            <label for="addTodoTitle">Title</label>
            <input 
                id="addTodoTitle"
                name="addTodoTitle"
                type="text"
                class="form-control form-control-lg {{ $errors->has('title') ? 'border border-danger' : '' }}"
                placeholder="Title..."
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
                value=""
                wire:model="description"
                aria-describedby="descriptionErrors"
            ></textarea>

            @if($errors->has('description'))
                <small id="descriptionErrors" class="form-text text-danger">{{ $errors->first('description') }}</small>
            @endif
        </div>

        <div class="form-group">
            <button 
                class="btn btn-success form-control" 
                wire:click="updateTodo" 
                type="submit"
                title="Save todo"
            >
                Save
            </button>
        </div>
    </div>
</div>