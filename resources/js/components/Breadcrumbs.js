// Instantiated in components/TaskList.js
import React, { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom';

const Breadcrumbs = ({ projects, active_id }) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([]);
        const newItems = [];

        const breadcrumbBuilder = (project_id) => {

            const project = projects.find(p => (p.id == project_id));
            if (project.parent_id != null) {
                breadcrumbBuilder(project.parent_id);
            }
            newItems.push(project);
        }

        breadcrumbBuilder(active_id);
        setItems(newItems);
    }, [active_id]);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
                {items.map(item => (
                    <BreadcrumbItem
                        item={item}
                        isActive={item.id == active_id}
                        key={`breadcrumb-${item.id}`}
                    />
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;

const BreadcrumbItem = ({ item, isActive }) => {

    const element = isActive ? (
        <li className="breadcrum-item active">
            {item.title}
        </li>
    ) : (
            <>
                <li className="breadcrum-item" aria-current="page">
                    <Link to={`/projects/${item.id}/tasks`} >
                        {item.title}
                    </Link>
                </li>
                <span className="mx-1">/</span>
            </>
        );

    return element;
}