import React, { useEffect } from 'react';

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
                {projects.map(project => (
                    <li className={project.id == currentProject.id ? 'list-group-item projectsListItem active' : 'list-group-item projectsListItem'} 
                        title={project.description} 
                        key={project.id}
                        onClick={() => dispatch(setCurrentProject(project.id))}
                    >
                        <span>{project.title}</span>
                    </li> 
                ))}
            </ul>

        </div> 
    );
}

export default Projects;
