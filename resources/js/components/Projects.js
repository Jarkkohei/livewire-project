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

                const data = res.data.map((project) => {
                    project.showChildren = false;
                    return project;
                });

                const projectsWithChildren = data.map((project) => {
                    project.children = data.filter(p => p.parent_id == project.id);
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

    const toggleShowChildren = (id) => {
        const newProjects = projects.map((project) => {
            if (project.id == id) {
                project.showChildren = !project.showChildren;
            }
            return project;
        });
        setProjects(newProjects);
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                <div>Projects</div>
            </div>

            <ul className="list-group list-group-flush">
                {isLoading && (<p>Loading projects...</p>)}
                {!isLoading && projects.map(project => project.level == 1 && (
                    <ProjectsListItem project={project} key={project.id} toggleShowChildren={toggleShowChildren}/>
                ))}
            </ul>

        </div> 
    );
}

const ProjectsListItem = ({ project, toggleShowChildren }) => {

    const styles = { paddingLeft: project.level * 10 + 10 };
    const canShowChildren = project.showChildren && project.children.length && project.children.length > 0;

    const CaretButton = styled.button`
        color: inherit;
        min-width: 26px;

        &:hover {
            box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
            color: inherit;
        }
    `;

    const ChildWrapper = styled.div`
        animation: slide-up 0.4s ease;
        display: ${props => (props.show ? 'block' : 'none')};
    `;

    return (
        <>
            <NavLink
                style={styles}
                className="projectsListItem list-group-item d-flex align-items-center justify-content-between"
                to={`/projects/${project.id}`}
                title={project.description}
                key={project.id}
            >
                <span>{project.title}</span>
                {project.children.length && project.children.length > 0 ?
                    (project.showChildren ? (
                        <CaretButton className="btn btn-sm" type="button" onClick={() => toggleShowChildren(project.id)} title="Hide subprojects">
                            <i className="fas fa-caret-down"></i>
                        </CaretButton>
                    ) : (
                        <CaretButton className="btn btn-sm" type="button" onClick={() => toggleShowChildren(project.id)} title="Show subprojects">
                            <i className="fas fa-caret-right"></i>
                        </CaretButton>
                        )
                    ) : ''}
            </NavLink>

            <ChildWrapper show={canShowChildren}>
                {project.children.map((child) => (
                    <ProjectsListItem project={child} key={child.id} toggleShowChildren={toggleShowChildren}/>
                ))}
            </ChildWrapper>

        </>
    );
}

export default Projects;