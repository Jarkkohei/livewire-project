import Axios from "axios";

export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';

export const fetchProjectsPending = () => ({
    type: FETCH_PROJECTS_PENDING
});

export const fetchProjectsSuccess = (projects) => ({
    type: FETCH_PROJECTS_SUCCESS,
    projects: projects
});

export const fetchProjectsError = (error) => ({
    type: FETCH_PROJECTS_ERROR,
    error: error
});

const baseUrl = 'http://localhost:8000/api';

export const fetchProjects = () => {
    return dispatch => {
        dispatch(fetchProjectsPending());

        Axios({
            url: `${baseUrl}/projects`,
            method: 'GET'
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }

                const projectsWithChildren = res.data.map((project) => {
                    project.children = res.data.filter(p => p.parent_id == project.id);
                    return project;
                });
                dispatch(fetchProjectsSuccess(projectsWithChildren));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchProjectsError(error));
            })
    }
}

export const createNewProject = (project) => {
    return dispatch => {
        dispatch(fetchProjectsPending());

        Axios({
            url: `${baseUrl}/projects`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: project
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProjects());
                return res.data;
            })
            .catch(error => {
                dispatch(fetchProjectsError(error));
            })
    }
}

export const updateProject = (project) => {
    return dispatch => {
        dispatch(fetchProjectsPending());

        Axios({
            url: `${baseUrl}/projects/${project.id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            data: project
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProjects());
                return res.data;
            })
            .catch(error => {
                dispatch(fetchProjectsError(error));
            });
    }
}

export const deleteProject = (projectId) => {
    return dispatch => {
        dispatch(fetchProjectsPending());

        Axios({
            url: `${baseUrl}/projects/${projectId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProjects());
                return res.data;
            })
            .catch(error => {
                dispatch(fetchProjectsError(error));
            });
    }
}