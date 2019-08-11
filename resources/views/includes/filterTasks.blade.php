<div class="card shadow-sm mt-3">
    <div class="card-header d-flex justify-content-between align-items-center flex-column flex-sm-row flex-lg-column px-0">

        <div class="form-group col mb-2">
            <div class="row justify-content-start align-items-center">
                <div class="col-12">
                    <label for="itemsPerPageSelect">
                        Per page:
                    </label>
                </div>

                <div class="col-12">
                    <select 
                        wire:model="itemsPerPage"
                        wire:change="$set('currentPageNumber', 1)"
                        name="itemsPerPageSelect"
                        class="form-control form-control-sm {{ $errors->has('itemsPerPage') ? 'border border-danger' : '' }} shadow-sm"
                        aria-describedby="itemsPerPageErrors"
                    >
                        @foreach($itemsPerPageOptions as $itemsPerPageOption)
                            <option 
                                name="{{ $itemsPerPageOption }}" 
                                value="{{ $itemsPerPageOption }}" 
                                {{ $itemsPerPageOption == $itemsPerPage ? 'selected' : '' }}
                            >
                                {{ $itemsPerPageOption }}
                            </option>
                        @endforeach
                    </select>
                
                    @if($errors->has('itemsPerPage'))
                        <small id="itemsPerPageErrors" class="form-text text-danger">{{ $errors->first('itemsPerPage') }}</small>
                    @endif
                </div>
            </div>
        </div>

        <div class="form-group col mb-2">
            <div class="row justify-content-center">
                <div class="col-12">
                    <label>Include statuses:</label>
                </div>

                <div class="col-12 mt-2">
                     <div class="row justify-content-between align-items-center px-2 text-center">
                        @foreach($taskStatuses as $taskStatus)
                            <i class="col px-1 {{ $taskStatus['classes'] }} {{ $taskStatus['included'] ? 'text-primary' : 'text-muted'}}" 
                                title="{{ $taskStatus['label'] }}" 
                                style="cursor: pointer;" 
                                wire:click="toggleFilter({{ $loop->index }})"
                            ></i>
                        @endforeach
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="card-body d-flex justify-content-between align-items-center flex-column flex-sm-row flex-lg-column px-0 py-2">
        <div class="col-12 text-center">
            Filtered {{ $filteredItemsCount }} out of {{ $itemsCount }}
        </div>
    </div>

    
</div>