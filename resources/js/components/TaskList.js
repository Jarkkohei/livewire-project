// Instantiated in components/Home.js
import React, { useEffect, useState } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import { 
    fetchTasks, 
    fetchRecentTasks,
    createNewTask,
    updateTask,
    deleteTask,
    SET_TASKS_CURRENT_SORT_OPTION, 
    SET_TASKS_PAGINATION, 
    TOGGLE_FILTER_TASK_STATUS
} from '../actions/tasks';

import {
    deleteProject
} from '../actions/projects';

import Spinner from './Spinner';
import Sorting from './Sorting';
import Filtering from './Filtering';
import Pagination from './Pagination';
import Breadcrumbs from './Breadcrumbs';

import TaskModal from './TaskModal';
import { fetchProjects } from '../actions/projects';

const TaskList = ({ match, history }) => {

    const dispatch = useDispatch();

    const routeUrls = {
        taskEdit: `/projects/${match.params.project_id}/tasks/${match.params.task_id}/edit`,
        taskCreate: `/projects/${match.params.project_id}/tasks/create`
    };

    const modalModes = {
        EDIT: 'EDIT',
        CREATE: 'CREATE'
    };

    const [isRecentVisible, setIsRecentVisible] = useState(true);
    const {tasks, pending, pagination: { meta }, perPageOptions, currentSortOption, sortOptions, statusIcons, availableTasksCount} = useSelector(state => state.tasks);

    const projects = useSelector(state => state.projects.projects);

    const setSortValues = (event) => {
        dispatch({ type: SET_TASKS_CURRENT_SORT_OPTION, payload: event.target.value });
    }

    const setPaginationValues = ({pageNumber, perPage}) => {
        dispatch({ type: SET_TASKS_PAGINATION, payload: { pageNumber, perPage } });
    }

    const setFilterValues = (statusIconId) => {
        dispatch({ type: TOGGLE_FILTER_TASK_STATUS, payload: statusIconId});
    }

    const filteredStatusIds = statusIcons
        .filter(statIcon => (statIcon.included))
        .map(statIcon => {
            return statIcon.id;
        });

    useEffect(() => {
        dispatch(fetchProjects());
    }, []);

    useEffect(() => {
        if(typeof match.params.project_id == 'undefined' || match.params.project_id == 'create' || match.params.project_id < 1) {
            setIsRecentVisible(true);
            dispatch(fetchRecentTasks());
        } else {

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

    const handleCreateNewTask = (task) => {
        task = { ...task, user_id: 1 };
        dispatch(createNewTask(task, {
            project_id: match.params.project_id,
            page: meta.current_page,
            perPage: meta.per_page,
            sortBy: currentSortOption.sortBy,
            sortDir: currentSortOption.sortDir,
            filter: {
                statuses: filteredStatusIds
            }
        }));
        dispatch(fetchProjects());
    }

    const handleUpdateTask = (task) => {
        task = { ...task, user_id: 1 };
        dispatch(updateTask(task, {
            project_id: match.params.project_id,
            page: meta.current_page,
            perPage: meta.per_page,
            sortBy: currentSortOption.sortBy,
            sortDir: currentSortOption.sortDir,
            filter: {
                statuses: filteredStatusIds
            }
        }));
        dispatch(fetchProjects());
    }

    const handleDeleteTask = (task_id) => {
        dispatch(deleteTask(task_id, {
            project_id: match.params.project_id,
            page: meta.current_page,
            perPage: meta.per_page,
            sortBy: currentSortOption.sortBy,
            sortDir: currentSortOption.sortDir,
            filter: {
                statuses: filteredStatusIds
            }
        }));
        dispatch(fetchProjects());
    }

    const handleDeleteProject = (projectId) => {
        dispatch(deleteProject(projectId));
        history.push(`/projects`);
    }

    return (
        <>
        {tasks && projects.length > 0 && (
            <div>
                {!isRecentVisible && (
                    <>
                    <div className="card shadow-sm">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <Breadcrumbs projects={projects} active_id={match.params.project_id} />
                            <div className="ml-3">
                                {tasks.length == 0 && (
                                    <button
                                        className="btn btn-sm btn-danger mr-1"
                                        onClick={() => { handleDeleteProject(match.params.project_id) }}
                                        title="Delete project"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                )}
                                <Link to={`${match.url}/create`}>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => { }}
                                        title="Add new task"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    </>
                )}

                {isRecentVisible && (
                <div className="card shadow-sm">
                    <div className="recentTasksCardHeader card-header d-flex justify-content-between align-items-center">
                        <div>Recent Tasks</div>     
                    </div>
                </div>
                )}

                {tasks.length == 0 ? (
                    <>
                    {pending ? (
                        <div className="card shadow-sm mt-3">
                            <div className="card-header d-flex justify-content-center align-items-center">
                                <Spinner />
                            </div>
                        </div>
                    ) : (
                        <div className="card shadow-sm mt-3">
                            <div className="card-header d-flex justify-content-center align-items-center">
                                <p className="mb-0">No tasks for this project</p>
                            </div>
                        </div>
                    )}
                    </>
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
                                <TaskListItem task={task} key={task.id} deleteHandler={handleDeleteTask} />
                            ))}
                        </div>

                        {!isRecentVisible && (
                            <Pagination meta={meta} perPageOptions={perPageOptions} setPaginationValues={setPaginationValues} />
                        )}
                    </>
                )}
            </div>
        )}

        <Route
            path={routeUrls.taskEdit}
            exact 
            render={() => (
                <TaskModal
                    match={match}
                    title="Edit Task"
                    mode={modalModes.EDIT}
                    closeHandler={() => { history.replace(`/projects/${match.params.project_id}/tasks`) }}
                    confirmHandler={handleUpdateTask}
                />
            )}
        />

        <Route
            path={routeUrls.taskCreate}
            exact 
            render={() => (
                <TaskModal
                    match={match}
                    title="Create Task"
                    mode={modalModes.CREATE}
                    closeHandler={() => { history.replace(`/projects/${match.params.project_id}/tasks`) }}
                    confirmHandler={handleCreateNewTask}
                />
            )}
        />

        </> 
    );
}

export default withRouter(TaskList);

const TaskStatusIcon = ({ status }) => {

    const taskStatusObject = useSelector(state => state.tasks.statusIcons.find((s) => (s.id == status)));
    const wrapperStyles = { minWidth: 30, maxWidth: 30 };
    let styles = {};

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

const TaskListItem = ({ task, deleteHandler }) => {

    const editLinkUrl = `/projects/${task.project_id}/tasks/${task.id}/edit`;
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    return (
        <div className="card taskListItem" key={task.id}>
            <div className="card-header shadow-sm d-flex justify-content-between align-items-center px-2 px-md-3">
                <TaskStatusIcon status={task.status} />

                <h2 className="mb-0">
                    <button
                        className="btn btn-link"
                        type="button"
                        style={task.status == 0 ? { textDecoration: 'line-through' } : {}}
                        title="Show task details"
                        onClick={() => setIsDetailsVisible(!isDetailsVisible) }
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
                        onClick={() => { deleteHandler(task.id) }}
                        title="Delete"
                    >
                        <i className="far fa-trash-alt"></i>
                    </button>
                </div>

            </div>

            <SlideDown>
                {isDetailsVisible ? (
                    <div>
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Description:  </strong>{task.description}
                            </div>
                        </div>
                    </div>
                ) : null}
            </SlideDown>

        </div>
    );
}