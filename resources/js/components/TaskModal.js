// Instantiated in components/TaskList.js
import React, { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from 'react-redux';

const TaskModal = ({ match, title, closeHandler, confirmHandler, mode }) => {

    const styles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999
    };

    const tasks = useSelector(state => state.tasks.tasks);
    const [editedTask, setEditedTask] = useState({});

    useEffect(() => {
        if(match.params.task_id !== 'create' && match.params.task_id > 0) {
            const task = tasks.find((task) => (task.id == match.params.task_id));
            setEditedTask(task);
        }
    }, []);

    return createPortal (
        <>
            <div style={styles}>

                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                {title}
                            </h5>
                            <button type="button" className="close" aria-label="Close" onClick={closeHandler}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            {editedTask.title}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeHandler}>
                                Close
                            </button>

                            <button type="button" className="btn btn-primary" onClick={confirmHandler}>
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
        position: 'absolute',
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