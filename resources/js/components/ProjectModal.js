// Instantiated in components/Projects.js
import React, { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import { useSelector } from 'react-redux';

const ProjectModal = ({ activeProjectId, title, closeHandler, confirmHandler, mode }) => {

    const styles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999
    };

    //const [errors, setErrors] = useState({});
    const { projects: { projects } } = useSelector(state => state);

    const initialProject = {
        title: '',
        description: '',
        parent_id: ''
    };

    const [editedProject, setEditedProject] = useState(initialProject);

    useEffect(() => {
        if(activeProjectId && mode == 'EDIT') {
            const project = projects.find(project => project.id == activeProjectId);
            setEditedProject({ ...project, parent_id: project.parent_id ? project.parent_id : '' });
        } else if(activeProjectId && mode == 'CREATE') {
            setEditedProject({ ...editedProject, parent_id: activeProjectId });
        }
    }, []);

    /*
    const projectValid = () => {
        setErrors({});
        //console.log(editedProject.title.trim().length);
        if (editedProject.title.trim().length < 3) {
            setErrors({ ...errors, title: 'Title is too short. Minimum of 3 charachters required.' });
            return false;
        }
        return false;
    }
    */

    const closeModal = () => {
        setEditedProject(initialProject);
        closeHandler();
    }

    const saveProject = () => {
        /*
        if (projectValid == true) {
            confirmHandler(editedProject);
            closeModal();
        }
        */
        confirmHandler(editedProject);
        setEditedProject(initialProject);
        closeModal();
    }

    return createPortal(
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
                                <label htmlFor="editProjectTitle">Title</label>
                                <small className="text-danger">(required)</small>
                                <input
                                    id="editProjectTitle"
                                    name="editProjectTitle"
                                    type="text"
                                    className="form-control form-control shadow-sm"
                                    placeholder="Title..."
                                    onChange={(e) => { setEditedProject({ ...editedProject, title: e.target.value }) }}
                                    autoComplete="off"
                                    value={editedProject.title}
                                    title="Title"
                                />

                            </div>

                            <div className="form-group">
                                <label htmlFor="editProjectDescription">Description</label>
                                <textarea
                                    id="editProjectDescription"
                                    name="editProjectDescription"
                                    className="form-control shadow-sm"
                                    placeholder="Description..."
                                    rows="5"
                                    onChange={(e) => { setEditedProject({ ...editedProject, description: e.target.value }) }}
                                    autoComplete="off"
                                    value={editedProject.description}
                                    title="Description"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="editProjectParent">Parent project</label>
                                <select
                                    id="editProjectParent"
                                    name="editProjectParent"
                                    className="form-control form-control shadow-sm"
                                    onChange={(e) => { setEditedProject({ ...editedProject, parent_id: e.target.value }) }}
                                    value={editedProject.parent_id}
                                    title="Project"
                                >
                                    <option value="">None (Create as a root project)</option>
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
                                onClick={saveProject}
                                title={mode == 'EDIT' ? 'Save' : 'Create'}
                            >
                                {mode == 'EDIT' ? 'Save' : 'Create'}
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

export default ProjectModal;

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