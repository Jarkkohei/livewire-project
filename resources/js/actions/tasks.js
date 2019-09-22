import Axios from "axios";

export const FETCH_TASKS_PENDING = 'FETCH_TASKS_PENDING';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const SET_TASKS_PAGINATION_BY_RESPONSE = 'SET_TASKS_PAGINATION_BY_RESPONSE';
export const SET_TASKS_CURRENT_SORT_OPTION = 'SET_TASKS_CURRENT_SORT_OPTION';
export const SET_TASKS_PAGINATION = 'SET_TASKS_PAGINATION';
export const TOGGLE_FILTER_TASK_STATUS = 'TOGGLE_FILTER_TASK_STATUS';

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

const baseUrl = 'http://localhost:8000/api';

export const fetchTasks = ({ project_id, page, perPage, sortBy, sortDir, filter }) => {
    return dispatch => {
        dispatch(fetchTasksPending());

        Axios({
            url: `${baseUrl}/projects/${project_id}/tasks?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDir=${sortDir}&filter=${JSON.stringify(filter)}`,
            method: 'GET',
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch({ type: 'SET_TASKS_PAGINATION_BY_RESPONSE', payload: res});
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

        Axios({
            url: `${baseUrl}/tasks/recent`,
            method: 'GET',
        }).then(res => res.data)
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

export const createNewTask = (task, queryObject) => {
    return dispatch => {
        dispatch(fetchTasksPending());

        Axios({
            url: `${baseUrl}/tasks`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: task
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchTasks(queryObject));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchTasksError(error));
            });
    }
}

export const updateTask = (task, queryObject) => {
    return dispatch => {
        dispatch(fetchTasksPending());

        Axios({
            url: `${baseUrl}/tasks/${task.id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            data: task
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchTasks(queryObject));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchTasksError(error));
            });
    }
}

export const deleteTask = (task_id, queryObject) => {
    return dispatch => {
        dispatch(fetchTasksPending());

        Axios({
            url: `${baseUrl}/tasks/${task_id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchTasks(queryObject));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchTasksError(error));
            });
    }
}