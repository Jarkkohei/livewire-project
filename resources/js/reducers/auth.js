import {
    AUTH_ACTION_PENDING,
    //AUTH_ACTION_SUCCESS,
    AUTH_ACTION_ERROR,
    LOGIN_SUCCESS,
    FETCH_CURRENT_USER_SUCCESS,
    LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
    pending: false,
    user: {},
    auth_object: {},
    error: null
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTION_PENDING:
            return {
                ...state,
                pending: true
            }

        /*
        case AUTH_ACTION_SUCCESS:
            return {
                ...state,
                pending: false,
                //payload: action.payload
            }
        */

        case LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                auth_object: action.payload
            }

        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                pending: false,
                auth_object: {},
                user: {}
            }

        case AUTH_ACTION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:
            return state;
    }
}