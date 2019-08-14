<div class="container">
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
                        <label for="addTaskStatus">Status</label>
                        <select 
                            id="addTaskStatus" 
                            name="addTaskStatus"  
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
                        <label for="addTaskProject">Project</label>
                        <select 
                            id="addTaskProject" 
                            name="addTaskProject"  
                            class="form-control form-control shadow-sm"
                            wire:model="projectId" 
                        >
                            <option value="">--Select a project--</option>
                            @foreach($projects as $project)
                                <option 
                                    name="{{ $project['title'] }}" 
                                    value="{{ $project['id'] }}" 
                                    {{ $projectId == $project['id'] ? 'selected' : '' }}
                                >
                                    {{ $project['title'] }}
                                </option>
                            @endforeach
                        </select>

                        @if($errors->has('projectId'))
                            <small id="projectIdErrors" class="form-text text-danger">{{ $errors->first('projectId') }}</small>
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
