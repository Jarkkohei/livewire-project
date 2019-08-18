<div class="mt-4">
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Status</th>
                <th scope="col">Title</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($tasks as $task)
            <tr>
                <th scope="row">{{ $task->id }}</th>
                <td>{{ $task->status }}</td>
                <td>{{ $task->title }}</td>
                <td>
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-sm-6 pr-md-0">
                            <button class="btn btn-sm btn-primary" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div class="col-12 col-sm-6 pl-sm-0">
                            <button class="btn btn-sm btn-danger mt-2 mt-sm-0" title="Delete">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            @empty
                <p>No tasks to show</p>
            @endforelse
        </tbody>
    </table>
</div>