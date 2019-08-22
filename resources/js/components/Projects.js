import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../actions/projects';

const Projects = (props) => {

    const projects = useSelector(state => state.projects.projects);
    const currentProject = useSelector(state => state.projects.currentProject);
    const dispatch = useDispatch();

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

    const styles = { paddingLeft: project.level * 10 + 10 };

    return (
        <>
            <NavLink
                style={styles}
                className="list-group-item projectsListItem d-flex align-items-center justify-content-between"
                to={`/projects/${project.id}`}
                title={project.description}
                key={project.id}
            >
                <span>{project.title}</span>
                {project.children.length > 0 ?
                    (project.showChildren ? (
                        <i className="fas fa-caret-down"></i>
                    ) : (
                            <i className="fas fa-caret-right"></i>
                        )
                    ) : ''}
            </NavLink>

            {project.children.length > 0 ? project.children.map(child => (
                <ProjectsListItem project={child} key={child.id} />
            ))
             : ''}
        </>
    );
}

export default Projects;