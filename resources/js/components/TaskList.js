import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, fetchRecentTasks, setSortOption, setPagination, toggleFilterTaskStatus} from '../actions/tasks';

import Spinner from './Spinner';
import Sorting from './Sorting';
import Filtering from './Filtering';

const TaskList = ({ match }) => {

    const dispatch = useDispatch();

    const [isRecentVisible, setIsRecentVisible] = useState(false);
    const {tasks, pending, pagination: { meta }, perPageOptions, currentSortOption, sortOptions, statusIcons, availableTasksCount} = useSelector(state => state.tasks);

    const setSortValues = (event) => {
        dispatch(setSortOption(event.target.value));
    }

    const setPaginationValues = ({pageNumber, perPage}) => {
        dispatch(setPagination({ pageNumber, perPage }));   
    }

    const setFilterValues = (statusIconId) => {
        dispatch(toggleFilterTaskStatus(statusIconId));
    }

    useEffect(() => {
        if(typeof match.params.project_id === 'undefined') {
            setIsRecentVisible(true);
            dispatch(fetchRecentTasks());
        } else {
            const filteredStatusIds = statusIcons
                .filter(statIcon => (statIcon.included))
                .map(statIcon => {
                    return statIcon.id;
                });

            dispatch(fetchTasks({
                project_id: match.params.project_id,
                page: meta.current_page,
                perPage: meta.per_page,
                sortBy: currentSortOption.sortBy,
                sortDir: currentSortOption.sortDir,
                filter: {
                    statuses: filteredStatusIds
                }
            }));
            setIsRecentVisible(false);
        }
        
    }, [match.params.project_id, currentSortOption, meta.current_page, meta.per_page, statusIcons]);
    
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

                {pending ? (
                    <div className="card shadow-sm mt-3">
                        <div className="card-header d-flex justify-content-center align-items-center">
                            <Spinner />
                        </div>
                    </div>
                ) : (
                <>
                {tasks.length == 0 ? (
                    <div className="card shadow-sm mt-3">
                        <div className="card-header d-flex justify-content-center align-items-center">
                            <p className="mb-0">No tasks for this project</p>
                        </div>
                    </div>
                    ) : (
                    <>
                        {!isRecentVisible && (
                            <>
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <Sorting currentSortOptionId={currentSortOption.id} options={sortOptions} setSortValues={setSortValues} />
                                </div>

                                <div className="col-12 col-sm-6">
                                    <Filtering statusIcons={statusIcons} setFilterValues={setFilterValues} filteredTotal={meta.total} total={availableTasksCount} />
                                </div>
                            </div>

                            <Pagination meta={meta} perPageOptions={perPageOptions} setPaginationValues={setPaginationValues} />
                            </>
                        )}

                        <div className="accordion mt-3 shadow-sm" id="taskAccordion">
                            {tasks.map(task => (
                                <TasksListItem task={task} key={task.id} />
                            ))}
                        </div>

                        {!isRecentVisible && (
                            <Pagination meta={meta} perPageOptions={perPageOptions} setPaginationValues={setPaginationValues} />
                        )}
                    </>
                    )}
                </>
                )}
            </div>
        )}
        </> 
    );
}

export default TaskList;

const TaskStatusIcon = ({ status }) => {

    const taskStatusObject = useSelector(state => state.tasks.statusIcons.find((s) => (s.id == status)));
    const wrapperStyles = { minWidth: 30, maxWidth: 30 };
    let styles = { cursor: 'pointer' };

    if(taskStatusObject.colorStyle != '') {
        styles = {
            ...styles,
            color: taskStatusObject.colorStyle
        };
    }

    

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

const Pagination = ({ meta, perPageOptions, setPaginationValues }) => {

    const perPage = meta.per_page;
    const [goToPage, setGoToPage] = useState(meta.current_page);

    const handleGoToPage = (e) => {
        if (e.target.value < 1) {
            setGoToPage(1);
        } else if (e.target.value > meta.last_page) {
            setGoToPage(meta.last_page);
        } else {
            setGoToPage(e.target.value);
        }
    }

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header">

                <div className="row justify-content-between align-items-center flex-column flex-sm-row">

                    <div className="col-auto">
                        <div className="input-group input-group-sm" style={{ maxWidth: 130 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text">Per page</span>
                            </div>
                            <select
                                name="perPageSelect"
                                className="form-control form-control-sm shadow-sm"
                                value={perPage}
                                onChange={(e) => { setPaginationValues({ pageNumber: 1, perPage: e.target.value }) }}
                            >
                                {perPageOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-auto">
                        <div className="form-group row justify-content-center justify-content-sm-between align-items-center mb-0">
                            <nav aria-label="Task pagination links" className="mt-3 mt-sm-0">
                                <ul className="pagination mb-0">

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: 1, perPage: perPage }) }}
                                            aria-label="First"
                                            title="First"
                                            disabled={meta.current_page == 1}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: meta.current_page - 1, perPage: perPage }) }}
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
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: meta.current_page + 1, perPage: perPage }) }}
                                            aria-label="Next"
                                            title="Next"
                                            disabled={meta.current_page == meta.last_page}
                                        >
                                            <span aria-hidden="true">&rsaquo;</span>
                                        </button>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: meta.last_page, perPage: perPage }) }}
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

                    <div className="col-auto">
                        <div className="form-group row justify-content-center align-items-center mb-0">
                            <div className="input-group input-group-sm mt-3 mt-sm-0 mr-2 ml-auto" style={{ maxWidth: 115 }}>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm shadow-sm"
                                    min="1"
                                    max={meta.last_page}
                                    placeholder="Go to page"
                                    autoComplete="off"
                                    onChange={handleGoToPage}
                                />
                                <div className="input-group-append">
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => { setPaginationValues({ pageNumber: goToPage, perPage: perPage }) }}
                                        disabled={false}
                                    >Go</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}