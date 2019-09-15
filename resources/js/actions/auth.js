import Axios from "axios";

export const AUTH_ACTION_PENDING = 'AUTH_ACTION_PENDING';
//export const AUTH_ACTION_SUCCESS = 'AUTH_ACTION_SUCCESS';
export const AUTH_ACTION_ERROR = 'AUTH_ACTION_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const authActionPending = () => ({
    type: AUTH_ACTION_PENDING
});

/*
export const authActionSuccess = (payload) => ({
    type: AUTH_ACTION_SUCCESS,
    payload: payload,
});
*/

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload: payload,
});

export const fetchCurrentUserSuccess = (payload) => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    payload: payload
});

export const authActionError = (error) => ({
    type: AUTH_ACTION_ERROR,
    error: error
});

const baseUrl = 'http://localhost:8000/api/auth';

export const setCurrentUser = (access_token) => {
    return dispatch => {
        dispatch(authActionPending());

        Axios({
            method: 'post',
            url: `${baseUrl}/me`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
            
        }).then(res => res.data)
        .then(res => {
            if (res.error) {
                throw (res.error);
            }
            dispatch(getCurrentUserSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(authActionError(error));
        });
    }
}

export const login = ({ email, password }) => {
    return dispatch => {
        dispatch(authActionPending());

        Axios({
            method: 'post',
            url: `${baseUrl}/login`,
            data: {
                email: email,
                password: password
            }
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(loginSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(authActionError(error));
            })
    }
}

export const logout = (access_token) => {
    return dispatch => {
        dispatch(authActionPending());

        Axios({
            method: 'post',
            url: `${baseUrl}/logout`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(res => res.data)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(logoutSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(authActionError(error));
            })
    }
}
