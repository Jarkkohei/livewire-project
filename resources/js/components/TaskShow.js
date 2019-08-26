import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTask } from '../actions/tasks';

const TaskShow = ({ match }) => {

    const backUrl = `/projects/${match.params.project_id}`;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTask(match.params.task_id));
    }, []);

    const [task] = useSelector(state => state.tasks.tasks);

    return (
        <>
            {task && (
            <div className="card shadow-sm">

                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        Show task
                    </div>
                    <div>
                        <NavLink to={backUrl}>
                            <button type="button" className="btn btn-sm btn-outline-secondary" title="go back" onClick={() => {}}>
                                <i className="fas fa-arrow-left"></i> Back
                            </button>
                        </NavLink>
                    </div>
                </div>

                <div className="card-body">
                    <div className="form-group ">
                        <label htmlFor="editTaskTitle">Title: </label>
                        <p className="ml-2">{task.title}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="editTaskDescription">Description: </label>
                        <p className="ml-2">{task.description}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="editTaskStatus">Status: </label>
                        <p className="ml-2">{task.status}</p>
                    </div >
                </div>
            </div>
            )}
        </>
    );
}

export default TaskShow;