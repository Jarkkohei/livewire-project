import { FETCH_PROJECTS_PENDING, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_ERROR, SET_CURRENT_PROJECT } from '../actions/projects';

const initialState = {
    pending: false,
    projects: [{ id: 1, title: 'Titteli', description: 'Kuvaus'}],
    currentProject: { id: 1, title: 'Titteli', description: 'Kuvaus' },
    error: null
}

export const projects = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                pending: false,
                projects: action.projects,
                currentProjectId: action.projects[0]
            }
        case FETCH_PROJECTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: action.currentProject
            }
        default:
            return state;
    }
}

/*
export const getProjects = state => state.projects;
export const getProjectsPending = state => state.pending;
export const getProjectsError = state => state.error;
*/

/*
const projects = (state = [], action) => {
    switch (action.type) {

        case 'FETCH_PROJECTS':
            return axios.get('http://localhost:8000/api/users/1/projects')
                .then(response => {
                    console.log(response.data.data);
                    //return response.data.data;
                })
                .catch(error => {
                    throw (error);
                });

        case 'FETCH_PROJECTS_BEGIN':
            return axios.get('http://localhost:8000/api/users/1/projects')
                .then(response => {
                    //console.log(response.data.data);

                    return response.data.data;
                })
                .catch(error => {
                    dispatch({type: 'FETCH_PROJECTS_ERROR'});
                });

        case 'FETCH_PROJECTS_SUCCESS':

        case 'FETCH_PROJECTS_ERROR':
            console.log();

        case 'ADD_PROJECT':
            return [
                ...state,
                {
                    title: action.title,
                    description: action.description,
                    userId: action.userId
                }
            ];

        default:
            return state;
    }
}

export default projects;
*/
