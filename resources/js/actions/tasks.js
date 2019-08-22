export const FETCH_TASKS_PENDING = 'FETCH_TASKS_PENDING';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';

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

const baseUrl = 'http://localhost:8000/api/users/1/projects';


export const fetchTasks = (project_id) => {
    return dispatch => {
        dispatch(fetchTasksPending());
        fetch(`${baseUrl}/${project_id}/tasks`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                //console.log(res.data);
                dispatch(fetchTasksSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchTasksError(error));
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