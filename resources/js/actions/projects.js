export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';

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

export const setCurrentProject = (currentProjectId) => ({
    type: SET_CURRENT_PROJECT,
    currentProjectId: currentProjectId
});

const baseUrl = 'http://localhost:8000/api/users/1';

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
                dispatch(setCurrentProject(res.data[0].id));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchProjectsError(error));
            })
    }
}

/*
export const fetchTasks = () => ({
    type: 'FETCH_TASKS',
});

export const addTask = task => ({
    type: 'ADD_TASK',
    task
});
*/