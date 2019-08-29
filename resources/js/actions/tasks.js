export const FETCH_TASKS_PENDING = 'FETCH_TASKS_PENDING';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const SET_TASKS_PAGINATION = 'SET_TASKS_PAGINATION';
export const SET_TASKS_CURRENT_SORT_OPTION = 'SET_TASKS_CURRENT_SORT_OPTION';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';

export const fetchTasksPending = () => ({
    type: FETCH_TASKS_PENDING
});

export const fetchTasksSuccess = (tasks) => ({
    type: FETCH_TASKS_SUCCESS,
    tasks: tasks
});

export const fetchTasksError = (error) => ({
    type: FETCH_TASKS_ERROR,
    error: error
});

const setTasksPagination = (response) => ({
    type: SET_TASKS_PAGINATION,
    links: response.links,
    meta: response.meta
});

export const setSortOption = (sortOptionId) => ({
    type: SET_TASKS_CURRENT_SORT_OPTION,
    sortOptionId: sortOptionId
});

export const setCurrentTask = (task_id) => ({
    type: SET_CURRENT_TASK,
    taskId: task_id
});

const baseUrl = 'http://localhost:8000/api';


export const fetchTasks = ({ project_id, page = 1, sortBy, sortDir }) => {
    return dispatch => {
        dispatch(fetchTasksPending());
        fetch(`${baseUrl}/projects/${project_id}/tasks?page=${page}&sortBy=${sortBy}&sortDir=${sortDir}`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(setTasksPagination(res));
                dispatch(fetchTasksSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchTasksError(error));
            })
    }
}

export const fetchRecentTasks = () => {
    return dispatch => {
        dispatch(fetchTasksPending());
        fetch(`${baseUrl}/tasks/recent`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchTasksSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchTasksError(error));
            })
    }
}

/*
export const fetchTask = (task_id) => {
    return dispatch => {
        dispatch(fetchTasksPending());
        fetch(`${baseUrl}/tasks/${task_id}`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchTasksSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchTasksError(error));
            })
    }
}
*/