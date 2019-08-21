import { FETCH_TASKS_PENDING, FETCH_TASKS_SUCCESS, FETCH_TASKS_ERROR } from '../actions/tasks';

const initialState = {
    pending: false,
    tasks: [{ id: 1, title: 'Titteli', description: 'Kuvaus', status: 1, }],
    error: null
}

export const tasks = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                pending: false,
                tasks: action.tasks
            }
        case FETCH_TASKS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

/*
const tasks = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_TASKS':
            return fetch('HTTP://localhost:8000/api/user/1/projects/1/tasks');
        case 'ADD_TASK':
            return [
                ...state,
                {
                    title: action.title,
                    description: action.description,
                    status: action.status,
                    userId: action.userId
                }
            ];
        default:
            return state;
    }
}

export default tasks;
*/