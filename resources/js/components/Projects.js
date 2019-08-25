import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const Projects = (props) => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const baseUrl = 'http://localhost:8000/api';

    useEffect(() => {
        setIsLoading(true);
        fetch(`${baseUrl}/projects`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }

                const projectsWithChildren = res.data.map((project) => {
                    project.children = res.data.filter(p => p.parent_id == project.id);
                    return project;
                });

                setProjects(projectsWithChildren);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                throw new Error(error);
            });
    }, []);

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                <div>Projects</div>
            </div>

            <ul className="list-group list-group-flush">
                {isLoading && (<p>Loading projects...</p>)}
                {!isLoading && projects.map(project => project.level == 1 && (
                    <ProjectsListItem project={project} key={project.id} />
                ))}
            </ul>

        </div> 
    );
}

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
                to={`/projects/${project.id}`}
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

export default Projects;