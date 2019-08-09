<div class="card d-flex justify-content-between shadow-sm mt-2">
    <div class="card-header d-flex justify-content-between align-items-center flex-column flex-sm-row px-0">

        <div class="form-group col mb-2 mb-xl-0">
            <div class="row justify-content-start align-items-center">
                <div class="col-12 col-xl-auto">
                    <label class="mb-xl-0" for="sortBySelect">Sort by:</label>
                </div>

                <div class="col-12 col-xl-8">
                    <select 
                        wire:model="sortBy" 
                        name="sortBySelect"
                        class="form-control form-control-sm {{ $errors->has('title') ? 'border border-danger' : '' }} shadow-sm"
                        aria-describedby="sortByErrors"
                    >
                        @foreach($sortableFields as $field)
                            <option 
                                name="{{ $field['name'] }}" 
                                value="{{ $field['value'] }}" 
                                {{ $field['value'] == $sortBy ? 'selected' : '' }}
                            >
                                {{ $field['name'] == 'user_id' ? 'User' 
                                    : ($field['name'] == 'created_at' ? 'Creation date' 
                                    : ($field['name'] == 'updated_at' ? 'Update date' 
                                    : ucfirst($field['name']))) }}
                            </option>
                        @endforeach
                    </select>
                
                    @if($errors->has('sortBy'))
                        <small id="sortByErrors" class="form-text text-danger">{{ $errors->first('sortBy') }}</small>
                    @endif
                </div>
            </div>
        </div>

        <div class="form-group col mb-2 mb-xl-0">
            <div class="row justify-content-start align-items-center">
                <div class="col-12 col-xl-auto">
                    <label class="mb-xl-0" for="sortDirectionSelect">Sort direction:</label>
                </div>

                <div class="col-12 col-xl-8">
                    <select 
                        wire:model="sortDir"
                        name="sortDirectionSelect"
                        class="form-control form-control-sm {{ $errors->has('title') ? 'border border-danger' : '' }} shadow-sm"
                        aria-describedby="sortDirectionErrors"
                    >
                        @foreach($sortDirections as $direction)
                            <option 
                                name="{{ $direction['name'] }}" 
                                value="{{ $direction['value'] }}" 
                                {{ $direction['value'] == $sortDir ? 'selected' : '' }}
                            >
                                {{ $direction['name'] == 'asc' ? 'Ascending' : 'Descending' }}
                            </option>
                        @endforeach
                    </select>

                    @if($errors->has('sortDir'))
                        <small id="sortDirectionErrors" class="form-text text-danger">{{ $errors->first('sortDir') }}</small>
                    @endif
                </div>
            </div>
        </div>

    </div>
</div>