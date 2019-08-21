import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

const Projects = (props) => {

    const projects = useSelector(state => state.projects.projects);

    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                <div>Projects</div>
            </div>

            <ul className="list-group list-group-flush">
                {projects.map(project => (
                    <li className="list-group-item projectsListItem" title={project.description} key={project.id}>
                        <span>{project.title}</span>
                    </li> 
                ))}
            </ul>

        </div> 
    );
}

export default Projects;
