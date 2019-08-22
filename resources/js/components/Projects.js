import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../actions/projects';

const Projects = ({ match }) => {

    const projects = useSelector(state => state.projects.projects);
    const currentProject = useSelector(state => state.projects.currentProject);
    const dispatch = useDispatch();

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                <div>Projects</div>
            </div>

            <ul className="list-group list-group-flush">
                {projects.map(project => (
                    <NavLink 
                        className="list-group-item projectsListItem" 
                        to={ `/projects/${project.id}`} 
                        title={project.description}
                        key={project.id}
                    >
                        <span>{project.title}</span>
                    </NavLink>
                ))}
            </ul>

        </div> 
    );
}

export default Projects;