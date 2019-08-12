<div class="container vh-100">
    <div class="card shadow-sm">

        <div class="card-header d-flex justify-content-between align-items-center">
            <div>
                Edit task
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
            <div class="form-group ">
                <label for="editTaskTitle">Title</label>
                <small class="text-danger">(required)</small>
                <input 
                    id="editTaskTitle"
                    name="editTaskTitle"
                    type="text"
                    class="form-control form-control {{ $errors->has('title') ? 'border border-danger' : '' }} shadow-sm"
                    placeholder="Title..."
                    aria-describedby="titleErrors"
                    autocomplete="off"
                    wire:model="title"
                >

                @if($errors->has('title'))
                    <small id="titleErrors" class="form-text text-danger">{{ $errors->first('title') }}</small>
                @endif
            </div>

            <div class="form-group">
                <label for="editTaskDescription">Description</label>
                <textarea 
                    id="editTaskDescription"
                    name="editTaskDescription"
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
                <label for="editTaskStatus">Status</label>
                <select 
                    id="editTaskStatus" 
                    name="editTaskStatus"  
                    class="form-control form-control shadow-sm"
                    wire:model="status" 
                >
                    @foreach($taskStatuses as $taskStatus)
                        <option 
                            name="{{ $taskStatus['label'] }}" 
                            value="{{ $taskStatus['value'] }}" 
                            {{ $status == $taskStatus['value'] ? 'selected' : '' }}
                        >
                            {{ $taskStatus['label'] }}
                        </option>
                    @endforeach
                </select>

                @if($errors->has('status'))
                    <small id="statusErrors" class="form-text text-danger">{{ $errors->first('status') }}</small>
                @endif
            </div>

            <div class="form-group">
                <button 
                    class="btn btn-success form-control" 
                    wire:click="update" 
                    type="submit"
                    title="Save task"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
