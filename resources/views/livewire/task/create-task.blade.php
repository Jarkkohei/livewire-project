<div class="container vh-100">
    <div class="row justify-content-center">
        <div class="col col-md-8 col-lg-6">
            <div class="card shadow-sm">

                <div class="card-header d-flex justify-content-between align-items-center">
                    <div>
                        Add new task
                    </div>        
                    <div>
                        <button 
                            class="btn btn-sm btn-outline-secondary"
                            wire:click="back"
                            title="go back"
                        >
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                    </div>
                </div>

                <div class="card-body">
                    <div class="form-group">
                        <label for="addTaskTitle">Title</label>
                        <small class="text-danger">(required)</small>
                        <input 
                            id="addTaskTitle"
                            name="addTaskTitle"
                            type="text"
                            class="form-control {{ $errors->has('title') ? 'border border-danger' : '' }} shadow-sm"
                            placeholder="Title..."
                            aria-describedby="titleErrors"
                            wire:model="title"
                            autocomplete="off"
                            autofocus
                        >

                        @if($errors->has('title'))
                            <small id="titleErrors" class="form-text text-danger">{{ $errors->first('title') }}</small>
                        @endif
                    </div>

                    <div class="form-group">
                        <label for="addTaskDescription">Description</label>
                        <textarea 
                            id="addTaskDescription"
                            name="addTaskDescription"
                            class="form-control {{ $errors->has('description') ? 'border border-danger' : '' }} shadow-sm"
                            placeholder="Description..."
                            rows="5"
                            value=""
                            wire:model="description"
                            aria-describedby="descriptionErrors"
                            autocomplete="off"
                        ></textarea>

                        @if($errors->has('description'))
                            <small id="descriptionErrors" class="form-text text-danger">{{ $errors->first('description') }}</small>
                        @endif
                    </div>

                    <div class="form-group">
                        <button 
                            class="btn btn-success form-control" 
                            wire:click="create" 
                            type="submit"
                            title="Add new Task"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
