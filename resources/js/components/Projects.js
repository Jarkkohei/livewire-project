// Instantiated in components/Home.js
import React, { useEffect, useState } from 'react';
import { NavLink, Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createNewProject, updateProject } from '../actions/projects';
import styled from 'styled-components';
import Spinner from './Spinner';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import ProjectModal from './ProjectModal';

const Projects = ({ match, history }) => {

    const dispatch = useDispatch();

    const modalModes = {
        EDIT: 'EDIT',
        CREATE: 'CREATE'
    };

    useEffect(() => {
        dispatch(fetchProjects());
    }, []);

    useEffect(() => {
        setShowEditButton(match.params.project_id && match.params.project_id > 0 && match.params.project_id != 'recent');
    }, [match.params.project_id]);

    const {projects, pending} = useSelector(state => state.projects);
    const [showEditButton, setShowEditButton] = useState();

    const handleCreateNewProject = (project) => {
        dispatch(createNewProject(project));
    }

    const handleUpdateProject = (project) => {
        dispatch(updateProject(project));
    }

    return (
        <>
        {projects && (
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center projectsListCardHeader">
                    <div>Projects</div>
                    <div className="ml-3">
                        {showEditButton && (
                            <Link to={`${match.url}/edit`}>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => { }}
                                    title="Edit current project"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                            </Link>
                        )}

                            <Link to={`${match.url}/create`}>
                            <button
                                className="btn btn-sm btn-primary ml-1"
                                onClick={() => { }}
                                title="Create Project"
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </Link>
                    </div>
                </div>

                {projects.length == 0 ? (
                    <>
                        {pending ? (
                            <div className="list-group-item d-flex justify-content-center align-items-center">
                                <Spinner />
                            </div>
                        ) : (
                            <ul className="list-group list-group-flush">
                                <div className="projectsListItem list-group-item d-flex align-items-center justify-content-between">
                                    <p className="mb-0">No tasks for this project</p>
                                </div>
                            </ul>
                        )}
                    </>
                ) : (
                    <ul className="list-group list-group-flush">
                        {projects.map(project => project.level == 1 && (
                            <ProjectsListItem project={project} key={project.id} />
                        ))}
                    </ul>
                )}
            </div> 
        )}

        <Route
            path={`${match.path}/edit`}
            exact
            render={() => (
                <ProjectModal
                    activeProjectId={match.params.project_id}
                    title="Edit Project"
                    mode={modalModes.EDIT}
                    closeHandler={() => { history.replace(`${match.url}/tasks`) }}
                    confirmHandler={handleUpdateProject}
                />
            )}
        />

        <Route
            path={`${match.path}/create`}
            exact
            render={() => (
                <ProjectModal
                    activeProjectId={match.params.project_id}
                    title="Create Project"
                    mode={modalModes.CREATE}
                    closeHandler={() => { history.replace(`${match.url}/tasks`) }}
                    confirmHandler={handleCreateNewProject}
                />
            )}
        />

        <Route
            path={'/projects/create'}
            exact
            render={() => (
                <ProjectModal
                    activeProjectId={null}
                    title="Create Project"
                    mode={modalModes.CREATE}
                    closeHandler={() => { history.replace(`${match.url}/tasks`) }}
                    confirmHandler={handleCreateNewProject}
                />
            )}
        />

        </>
    );
}

export default Projects;

const ProjectsListItem = ({ project }) => {

    const projectLevelIndentationStyles = { paddingLeft: project.level * 10 + 10 };
    const childWrapperKey = `childWrapper-${project.id}`;
    const hasChildren = project.children && project.children.length > 0;
    const [showChildren, setShowChildren] = useState(false);
    
    const CaretButton = styled.button`
        color: inherit;
        min-width: 26px;

        &:hover {
            box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
            color: inherit;
        }
    `;

    return (
        <>
            <NavLink
                style={projectLevelIndentationStyles}
                className="projectsListItem list-group-item d-flex align-items-center justify-content-between"
                to={`/projects/${project.id}/tasks`}
                title={project.description}
                key={project.id}
            >
                <span>{project.title} 
                    {project.tasks.length > 0 && (
                        <span 
                            className="ml-2 badge badge-secondary" 
                            title={`has ${project.tasks.length} task${project.tasks.length > 1 ? 's' : ''}`}
                        >
                            {project.tasks.length}
                        </span>
                    )}
                </span> 
                
                {hasChildren && (
                    <CaretButton 
                        className="btn btn-sm" 
                        type="button" 
                        onClick={() => setShowChildren(!showChildren)} 
                        title={showChildren ? 'Hide sub-projects' : 'Show sub-projects'}
                    >
                        <i className={showChildren ? 'fas fa-angle-down' : 'fas fa-angle-right'}></i>
                    </CaretButton>
                )}
            </NavLink>

            {hasChildren && (
                <SlideDown>
                    {showChildren ? (
                        <div key={childWrapperKey} >
                            {project.children.map((child) => (
                                <ProjectsListItem project={child} key={child.id} />
                            ))}
                        </div>
                    ) : null}
                </SlideDown>
            )}
        </>
    );
}