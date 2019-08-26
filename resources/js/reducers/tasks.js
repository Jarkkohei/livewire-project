import { FETCH_TASKS_PENDING, FETCH_TASKS_SUCCESS, FETCH_TASKS_ERROR } from '../actions/tasks';

const initialState = {
    pending: false,
    tasks: [],
    error: null,
    statusIcons: [
        { value: 1, label: 'Created',       classes: 'fas fa-rocket fa-lg',             colorClass: 'text-primary',     colorStyle: '',         included: true },
        { value: 2, label: 'Assigned',      classes: 'fas fa-user-circle fa-lg',        colorClass: 'text-secondary',   colorStyle: '',         included: true },
        { value: 3, label: 'In production', classes: 'fas fa-industry fa-lg',           colorClass: 'text-secondary',   colorStyle: '',         included: true },
        { value: 4, label: 'Blocked',       classes: 'fas fa-ban fa-lg',                colorClass: 'text-secondary',   colorStyle: '',         included: true },
        { value: 5, label: 'Burn in',       classes: 'fas fa-exclamation-circle fa-lg', colorClass: '',                 colorStyle: 'orange',   included: true },
        { value: 6, label: 'Hurry up',      classes: 'fas fa-fire fa-lg',               colorClass: 'text-danger',      colorStyle: '',         included: true },
        { value: 0, label: 'Completed',     classes: 'fas fa-check-circle fa-lg',       colorClass: 'text-success',     colorStyle: '',         included: true }
    ],
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