import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fetchProjects, toggleProjectShowChildren } from '../actions/projects';

const Projects = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjects());
    }, []);

    const projects = useSelector(state => state.projects.projects);

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                <div>Projects</div>
            </div>

            <ul className="list-group list-group-flush">
                {projects.map(project => project.level == 1 && (
                    <ProjectsListItem project={project} key={project.id}/>
                ))}
            </ul>

        </div> 
    );
}

const ProjectsListItem = ({ project }) => {

    const dispatch = useDispatch();
    const styles = { paddingLeft: project.level * 10 + 10 };
    const canShowChildren = project.showChildren && project.children.length && project.children.length > 0;

    const toggleShowChildren = () => {
        dispatch(toggleProjectShowChildren(project.id));
    }

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
                style={styles}
                className="projectsListItem list-group-item d-flex align-items-center justify-content-between"
                to={`/projects/${project.id}`}
                title={project.description}
                key={project.id}
            >
                <span>{project.title}</span>
                {project.children.length && project.children.length > 0 ?
                    (project.showChildren ? (
                        <CaretButton className="btn btn-sm" type="button" onClick={toggleShowChildren} title="Hide subprojects">
                            <i className="fas fa-caret-down"></i>
                        </CaretButton>
                    ) : (
                        <CaretButton className="btn btn-sm" type="button" onClick={toggleShowChildren} title="Show subprojects">
                            <i className="fas fa-caret-right"></i>
                        </CaretButton>
                        )
                    ) : ''}
            </NavLink>

            {canShowChildren ? project.children.map(child => (
                <ProjectsListItem project={child} key={child.id} />
            ))
             : ''}
        </>
    );
}

export default Projects;