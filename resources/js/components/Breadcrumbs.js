// Instantiated in components/TaskList.js
import React from 'react';
import { Link  } from 'react-router-dom';

const Breadcrumbs = ({ projects, active_id }) => {

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
                {projects.map(project => (
                    <BreadcrumbItem 
                        project={project} 
                        isActive={project.id == active_id} 
                        key={`breadcrumb-${project.id}`} 
                    />
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;

const BreadcrumbItem = ({ project, isActive }) => {

    const element = isActive ? (
        <li className="breadcrum-item active">
            {project.title}
        </li>
    ) : (
        <>
        <li className="breadcrum-item" aria-current="page">
            <Link to={`/projects/${project.id}/tasks`} >
                {project.title}
            </Link>
        </li>
        <span className="mx-1">/</span>
        </>
    );

    return element;
}