import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchTasks, fetchRecentTasks } from '../actions/tasks';

const Tasks = ({ match }) => {

    const dispatch = useDispatch();
    const [isRecentVisible, setIsRecentVisible] = useState(false);

    useEffect(() => {

        if(typeof match.params.project_id === 'undefined') {
            setIsRecentVisible(true);
            dispatch(fetchRecentTasks());
        } else {
            dispatch(fetchTasks(match.params.project_id));
            setIsRecentVisible(false);
        }
        
    }, [match.params.project_id]);

    const tasks = useSelector(state => state.tasks.tasks);
    
    return (
        <div>
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    {isRecentVisible ? (
                        <div>Recent Tasks</div>
                    ) : (
                        <>
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
                        </>
                    )}
                    
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

const TaskStatusIcon = ({ status }) => {

    const statusObjects = [
        { value: 1, label: 'Created',       classes: 'fas fa-rocket fa-lg',             colorClass: 'text-primary',     colorStyle: '',                 included: true },
        { value: 2, label: 'Assigned',      classes: 'fas fa-user-circle fa-lg',        colorClass: 'text-secondary',   colorStyle: '',                 included: true },
        { value: 3, label: 'In production', classes: 'fas fa-industry fa-lg',           colorClass: 'text-secondary',   colorStyle: '',                 included: true },
        { value: 4, label: 'Blocked',       classes: 'fas fa-ban fa-lg',                colorClass: 'text-secondary',   colorStyle: '',                 included: true },
        { value: 5, label: 'Burn in',       classes: 'fas fa-exclamation-circle fa-lg', colorClass: '',                 colorStyle: 'orange',           included: true },
        { value: 6, label: 'Hurry up',      classes: 'fas fa-fire fa-lg',               colorClass: 'text-danger',      colorStyle: '',                 included: true },
        { value: 0, label: 'Completed',     classes: 'fas fa-check-circle fa-lg',       colorClass: 'text-success',     colorStyle: '',                 included: true }
    ];

    const taskStatusObject = statusObjects.find((s) => {
        return s.value == status;
    });

    let styles = { cursor: 'pointer' };

    if(taskStatusObject.colorStyle != '') {
        styles = {
            ...styles,
            color: taskStatusObject.colorStyle
        };
    }

    const wrapperStyles = { minWidth: 30, maxWidth: 30 };

    return (
        <div className="text-center" style={wrapperStyles}>
            <i className={`${taskStatusObject.classes} ${taskStatusObject.colorClass}`}
                title={taskStatusObject.label}
                style={styles}
            ></i>
        </div>
    );
}


const TasksListItem = ({ task }) => {
    return (
        <div className="card taskListItem" key={task.id}>
            <div className="card-header shadow-sm d-flex justify-content-between align-items-center px-2 px-md-3">
                <TaskStatusIcon status={task.status} />

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