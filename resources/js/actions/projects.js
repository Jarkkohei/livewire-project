export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';
export const TOGGLE_PROJECT_SHOW_CHILDREN = 'TOGGLE_PROJECT_SHOW_CHILDREN';

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

export const toggleProjectShowChildren = (projectId) => ({
    type: TOGGLE_PROJECT_SHOW_CHILDREN,
    projectId: projectId
});

const baseUrl = 'http://localhost:8000/api';

export const fetchProjects = () => {
    return dispatch => {
        dispatch(fetchProjectsPending());
        fetch(`${baseUrl}/projects`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProjectsSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchProjectsError(error));
            })
    }
}