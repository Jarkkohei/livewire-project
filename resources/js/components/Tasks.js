import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchTasks } from '../actions/tasks';

const Tasks = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks(match.params.project_id));
    }, [match.params.project_id]);

    const tasks = useSelector(state => state.tasks.tasks);
    
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
                {tasks && tasks.map(task => (
                    <TasksListItem task={task} key={task.id}/>
                ))}

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


const TasksListItem = ({ task }) => {
    return (
        <div className="card taskListItem" key={task.id}>
            <div className="card-header shadow-sm d-flex justify-content-between align-items-center px-2 px-md-3">
                <div className="text-center" style={{ minWidth: 30, maxWidth: 30 }}>
                    {/*
                                @foreach($taskStatuses as $taskStatus)
                                    @if($taskStatus['value'] == $task['status'])
                                        <i
                                            className="{{ $taskStatus['classes'] }} {{ $taskStatus['colorClass'] }}"
                                            title="{{ $taskStatus['label'] }}"
                                            style="cursor: pointer; {{ $taskStatus['styles'] }}"
                                        ></i>
                                    @endif
                                @endforeach
                                */}

                    <i>{task.status}</i>

                </div>

                <h2 className="mb-0">
                    <button
                        className="btn btn-link"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapse-{task.id'}"
                        aria-expanded="false"
                        aria-controls="collapse-{{ $task['id'] }}"
                        style={task.status == 0 ? { textDecoration: 'line-through' } : {}}
                        title="Show task details"
                    >
                        {task.title}
                    </button>
                </h2>

                <div style={{ minWidth: 65, marginLeft: 10 }}>
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => { }}
                        title="Edit"
                    >
                        <i className="fas fa-edit"></i>
                    </button>

                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => { }}
                        title="Delete"
                    >
                        <i className="far fa-trash-alt"></i>
                    </button>
                </div>

            </div>

            <div
                id="collapse-{{ $task['id'] }}"
                className="collapse hide"
                aria-labelledby="heading-{{ $task['id'] }}"
                data-parent="#taskAccordion"
            >
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        {task.description}
                    </div>
                </div>
            </div>
        </div>
    );
}