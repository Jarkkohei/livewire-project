// Instantiated in components/Home.js
import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../actions/projects';
import styled from 'styled-components';
import Spinner from './Spinner';

const Projects = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjects());
    }, []);

    const projects = useSelector(state => state.projects.projects);
    const isLoading = useSelector(state => state.projects.pending);

    return (
        <>
        {projects && (
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                    <div>Projects</div>
                </div>

                {isLoading ? (
                        <div className="list-group-item d-flex justify-content-center align-items-center">
                        <Spinner />
                    </div>
                ) : (
                    <ul className="list-group list-group-flush">
                        {projects.map(project => project.level == 1 && (
                            <ProjectsListItem project={project} key={project.id} />
                        ))}
                    </ul>
                )}
            </div> 
        )}
        </>
    );
}

export default withRouter(Projects);

const ProjectsListItem = ({ project }) => {

    const styles = { paddingLeft: project.level * 10 + 10, minHeight: 45, maxHeight: 45 };
    const childWrapperElementId = `childWrapper-${project.id}`;
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

    const toggleShowChildren = () => {
        const childWrapper = document.getElementById(childWrapperElementId);
        childWrapper.classList.toggle('d-none');
        setShowChildren(!showChildren);
    }

    return (
        <>
            <NavLink
                style={styles}
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
                    <CaretButton className="btn btn-sm" type="button" onClick={toggleShowChildren} title={showChildren ? 'Hide sub-projects' : 'Show sub-projects'}>
                        <i className={showChildren ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
                    </CaretButton>
                )}
            </NavLink>

            <div id={childWrapperElementId} className="childWrapper d-none">
                {project.children.map((child) => (
                    <ProjectsListItem project={child} key={child.id} toggleShowChildren={toggleShowChildren} />
                ))}
            </div>
        
        </>
    );
}