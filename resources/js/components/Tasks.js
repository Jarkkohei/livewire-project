import React from 'react';

const Tasks = () => {
    return (
        <div>
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>Tasks</div>
                    <div>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => { }}
                            title="Add new task"
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-6">
                    {/*@include('includes.sortTasks')*/}
                </div>

                <div className="col-12 col-lg-6">
                    {/*@include('includes.filterTasks')*/}
                </div>
            </div>

            {/*
                @if(count($tasks))
                    @include('includes.paginateTasks')
                @endif
                */}

            <div className="accordion mt-3 shadow-sm" id="taskAccordion">
                {/*
                    @forelse($tasks as $task)
                        @include('includes.taskListItem', $task)
                    @empty
                        <p>No tasks to show</p>
                    @endforelse
                    */}
            </div>

            {/*
                @if(count($tasks))
                    @include('includes.paginateTasks')
                @endif
            */}
        </div>
    );
}

export default Tasks;
