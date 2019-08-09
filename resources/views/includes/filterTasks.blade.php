<div class="card d-flex justify-content-between shadow-sm mt-2">
    <div class="card-header col">

        <div class="row justify-content-between align-items-center flex-column flex-sm-row px-0">

            <div class="form-group col mb-2 mb-xl-0">
                <div class="row justify-content-start align-items-center">
                    <div class="col-12 col-xl-auto">
                        <label class="mb-xl-0" for="itemsPerPageSelect">
                            Per page:
                        </label>
                    </div>

                    <div class="col-12 col-xl-8">
                        <select 
                            wire:model="itemsPerPage" 
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

            <div class="form-group col mb-2 mb-xl-0">
                <div class="row justify-content-end align-items-center">
                    <div class="col-12 col-xl-auto">
                        <label class="mb-xl-0">Filter:</label>
                    </div>

                    <div class="col-12 col-xl-8">
                        {{--
                        <select 
                            wire:model="itemsPerPage" 
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
                        --}}
                    </div>

                </div>
            </div>
        </diV>

        <div class="row mt-3">
            <div class="form-group col mb-2 mb-xl-0">
                <div class="row justify-content-start align-items-center">
                    <div class="col-12 col-xl-auto">
                        Item quantity: {{ $itemsCount }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    
</div>