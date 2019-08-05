<div>
    <div class="input-group d-flex">
        <input 
            id="addTodo"
            name="addTodo"
            type="text"
            class="form-control form-control-lg"
            placeholder="What needs to be done?"
            value="{{ old('addTodo') }}"
        >
        <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Add</button>
        </div>
    </div>

    <ul class="list-group mt-4">
        @foreach($todos as $todo)
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <input type="checkbox" class="mr-4">
                    <a href="#">{{ $todo->title }}</a>
                </div>

                <div>
                    <button class="btn btn-sm btn-danger">&times;</button>
                </div>
            </li>
        @endforeach
    </ul>
</div>
