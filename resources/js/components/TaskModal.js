// Instantiated in components/TaskList.js
import React, { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from 'react-redux';

const TaskModal = ({ match, title, closeHandler, confirmHandler, mode }) => {

    const styles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999
    };

    const [errors, setErrors] = useState({});
    const {tasks: {tasks, statusIcons}, projects: {projects}} = useSelector(state => state);
    const [editedTask, setEditedTask] = useState(
        {
            user_id: 1,
            title: '',
            description: '',
            status: 1,
            project_id: match.params.project_id
        }
    );

    useEffect(() => {
        if(match.params.task_id !== 'create' && match.params.task_id > 0) {
            const task = tasks.find((task) => (task.id == match.params.task_id));
            setEditedTask(task);
        }
    }, []);

    const taskValid = () => {
        setErrors({});
        console.log(editedTask.title.trim().length);
        if(editedTask.title.trim().length < 3) {
            setErrors({ ...errors, title: 'Title is too short. Minimum of 3 charachters required.'});
            return false;
        }
        return false;
    }

    const closeModal = () => {
        setEditedTask({});
        closeHandler();
    }

    const saveTask = () => {
        if(taskValid == true) {
            confirmHandler(editedTask);
            closeModal();
        }
        if(mode == 'CREATE') {
            confirmHandler(editedTask);
        } else if(mode == 'EDIT') {
            confirmHandler(editedTask.id, editedTask);
        }
        closeModal();
    }

    return createPortal (
        <>
            <div style={styles}>

                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">
                                {title}
                            </h5>
                            <button 
                                type="button" 
                                className="close text-white" 
                                aria-label="Close" 
                                onClick={closeModal}
                                title="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                            <div className="form-group ">
                                <label htmlFor="editTaskTitle">Title</label>
                                <small className="text-danger">(required)</small>
                                <input
                                    id="editTaskTitle"
                                    name="editTaskTitle"
                                    type="text"
                                    className="form-control form-control shadow-sm"
                                    placeholder="Title..."
                                    onChange={(e) => { setEditedTask({...editedTask, title: e.target.value}) }}
                                    autoComplete="off"
                                    defaultValue={editedTask.title}
                                    title="Title"
                                />

                            </div>

                            <div className="form-group">
                                <label htmlFor="editTaskDescription">Description</label>
                                <textarea
                                    id="editTaskDescription"
                                    name="editTaskDescription"
                                    className="form-control shadow-sm"
                                    placeholder="Description..."
                                    rows="5"
                                    onChange={(e) => { setEditedTask({ ...editedTask, description: e.target.value }) }}
                                    autoComplete="off"
                                    value={editedTask.description}
                                    title="Description"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="editTaskStatus">Status</label>
                                <select
                                    id="editTaskStatus"
                                    name="editTaskStatus"
                                    className="form-control form-control shadow-sm"
                                    onChange={(e) => { setEditedTask({ ...editedTask, status: parseInt(e.target.value, 10) }) }}
                                    defaultValue={editedTask.status}
                                    title="Status"
                                >
                                    {statusIcons.map((status) => (
                                        <option
                                            name={status.label}
                                            key={status.id}
                                            value={status.id}
                                        >
                                            {status.label}
                                        </option>
                                    ))}
                                </select >
                            </div >

                            <div className="form-group">
                                <label htmlFor="editTaskProject">Project</label>
                                <select
                                    id="editTaskProject"
                                    name="editTaskProject"
                                    className="form-control form-control shadow-sm"
                                    onChange={(e) => { setEditedTask({ ...editedTask, project_id: parseInt(e.target.value, 10) }) }}
                                    defaultValue={editedTask.project_id}
                                    title="Project"
                                >
                                    {projects.map((project) => (
                                        <option
                                            name={project.title}
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.title}
                                        </option>
                                    ))}
                                </select >
                            </div >

                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={closeModal}
                                title="Close"
                            >
                                Close
                            </button>

                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={saveTask}
                                title={ mode == 'EDIT' ? 'Save' : 'Create'}
                            >
                                { mode == 'EDIT' ? 'Save' : 'Create'}
                            </button>
                        </div>

                    </div>
                </div>
                
            </div>

            <BackDrop />
        </>,
        document.getElementById('modal_root'),
    );
}

export default TaskModal;

const BackDrop = () => {

    const styles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 9998
    };

    return (
        <div
            id="backdrop"
            style={styles}
        ></div>
    );
}