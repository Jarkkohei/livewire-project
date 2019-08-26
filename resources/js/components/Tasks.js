import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            dispatch(fetchTasks({project_id: match.params.project_id, page: 1}));
            setIsRecentVisible(false);
        }
        
    }, [match.params.project_id]);

    const tasks = useSelector(state => state.tasks.tasks);
    const { links, meta } = useSelector(state => state.tasks.pagination);

    //console.log(links, meta);

    return (
        <>
        {tasks && (
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
                
                {!isRecentVisible && (
                    <Pagination links={links} meta={meta} project_id={match.params.project_id} />
                )}

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

                {!isRecentVisible && (
                    <Pagination links={links} meta={meta} project_id={match.params.project_id} />
                )}
            </div>
        )}
        </> 
    );
}

export default Tasks;

const TaskStatusIcon = ({ status }) => {

    const taskStatusObject = useSelector(state => state.tasks.statusIcons.find((s) => (s.value == status)));

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

    const editLinkUrl = `/projects/${task.project_id}/tasks/${task.id}`;

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

                <div style={{ minWidth: 75, marginLeft: 10 }}>
                    <Link to={editLinkUrl}>
                        <button
                            type="button"
                            className="btn btn-sm btn-primary ml-1"
                            onClick={() => { }}
                            title="Edit"
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                    </Link>

                    <button
                        type="button"
                        className="btn btn-sm btn-danger ml-1"
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

const Pagination = ({ links, meta, project_id }) => {

    const dispatch = useDispatch();

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header d-flex justify-content-center align-items-center">
                <nav aria-label="Task pagination links">
                    <ul className="pagination mb-0">

                        <li className="page-item">
                            {/*
                            <a className="page-link" href={links.first} aria-label="First" title="First">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            */}
                            <button 
                                className="page-link" 
                                onClick={() => dispatch(fetchTasks({project_id: project_id, page: 1}))} 
                                aria-label="First" 
                                title="First"
                                disabled={meta.current_page == 1}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>

                        <li className="page-item">
                            {/*}
                            <a className="page-link" href={links.prev} aria-label="Previous" title="Previous">
                                <span aria-hidden="true">&lsaquo;</span>
                            </a>
                            */}
                            <button 
                                className="page-link" 
                                onClick={() => dispatch(fetchTasks({ project_id: project_id, page: meta.current_page - 1}))} 
                                aria-label="Previous" 
                                title="Previous"
                                disabled={meta.current_page == 1}
                            >
                                <span aria-hidden="true">&lsaquo;</span>
                            </button>
                        </li>

                        <li className="page-item active" aria-current="page">
                            <a 
                                className="page-link" 
                                href="#" 
                            >
                                {meta.current_page} of {meta.last_page} <span className="sr-only">(current)</span>
                            </a>
                        </li>

                        <li className="page-item">
                            {/*}
                            <a className="page-link" href={links.next} aria-label="Next" title="Next">
                                <span aria-hidden="true">&rsaquo; </span>
                            </a>
                            */}
                            <button 
                                className="page-link" 
                                onClick={() => dispatch(fetchTasks({ project_id: project_id, page: meta.current_page + 1}))} 
                                aria-label="Next" 
                                title="Next"
                                disabled={meta.current_page == meta.last_page}
                            >
                                <span aria-hidden="true">&rsaquo;</span>
                            </button>
                        </li>

                        <li className="page-item">
                            {/*}
                            <a className="page-link" href={links.last} aria-label="Last" title="Last">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                            */}
                            <button 
                                className="page-link" 
                                onClick={() => dispatch(fetchTasks({ project_id: project_id, page: meta.last_page}))} 
                                aria-label="Last" 
                                title="Last"
                                disabled={meta.current_page == meta.last_page}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    );
}