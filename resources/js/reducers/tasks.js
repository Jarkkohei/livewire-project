import { 
    FETCH_TASKS_PENDING, 
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_ERROR, 
    SET_TASKS_PAGINATION_BY_RESPONSE,
    SET_TASKS_CURRENT_SORT_OPTION,
    SET_CURRENT_TASK,
    SET_TASKS_PAGINATION,
} from '../actions/tasks';

const initialState = {
    pending: false,
    tasks: [],
    currentTask: null,
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
    pagination: {
        links: {
            first: "",
            last: "",
            next: "",
            prev: null,
        },
        meta: {
            current_page: 1,
            from: null,
            last_page: null,
            path: "",
            per_page: 10,
            to: null,
            total: null,
        }
    },
    sortOptions: [
        { id: 1,    label: 'Most urgent first',             sortBy: 'status',       sortDir: 'desc' },
        { id: 2,    label: 'Most urgent last',              sortBy: 'status',       sortDir: 'asc' },
        { id: 3,    label: 'Title A-Z',                     sortBy: 'title',        sortDir: 'asc' },
        { id: 4,    label: 'Title Z-A',                     sortBy: 'title',        sortDir: 'desc' },
        { id: 5,    label: 'Description A-Z',               sortBy: 'description',  sortDir: 'asc' },
        { id: 6,    label: 'Description Z-A',               sortBy: 'description',  sortDir: 'desc' },
        { id: 7,    label: 'Assignee A-Z',                  sortBy: 'user.name',    sortDir: 'asc' },
        { id: 8,    label: 'Assignee Z-A',                  sortBy: 'user.name',    sortDir: 'desc' },
        { id: 9,    label: 'Newest first',                  sortBy: 'created_at',   sortDir: 'desc' },
        { id: 10,   label: 'Oldest first',                  sortBy: 'created_at',   sortDir: 'asc' },
        { id: 11,   label: 'Most recently updated first',   sortBy: 'updated_at',   sortDir: 'desc' },
        { id: 12,   label: 'Most recently updated last',    sortBy: 'updated_at',   sortDir: 'asc' },
    ],
    currentSortOption: { id: 1, label: 'Most urgent first', sortBy: 'status', sortDir: 'desc' },
    perPageOptions: [
        5, 10, 25, 50, 100, 200
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
                tasks: action.tasks,
                currentTask : null
            }
        case FETCH_TASKS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        case SET_TASKS_PAGINATION_BY_RESPONSE:
            return {
                ...state,
                pagination: {
                    links: action.links,
                    meta: action.meta
                }
            }

        case SET_TASKS_CURRENT_SORT_OPTION:
            const currentSortOption = state.sortOptions.find(option => (option.id == action.sortOptionId));
            return {
                ...state,
                currentSortOption: currentSortOption,
                pagination: {
                    ...state.pagination,
                    meta: {
                        ...state.pagination.meta,
                        current_page: 1
                    }
                }
            }
        
        case SET_CURRENT_TASK:
            if(action.taskId == null) {
                return {
                    ...state,
                    currentTask: null
                }
            }
            const currentTask = state.tasks.find(task => (task.id == action.taskId));
            return {
                ...state,
                currentTask: currentTask
            }

        case SET_TASKS_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    meta: {
                        ...state.pagination.meta,
                        current_page: action.pageNumber,
                        per_page: action.perPage
                    }
                }
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