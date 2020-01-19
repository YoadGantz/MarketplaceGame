import UserService from "../services/UserService";

export function login(cred) {
    return async dispatch => {
        try {
            const user = await UserService.login(cred);
            dispatch(setUser(user));
        } catch (err) {
        }
    };
}

export function signUp(cred) {
    return async dispatch => {
        try {
            const user = await UserService.signup(cred);
            dispatch(setUser(user));
        } catch (err) {
        }
    };
}

export function logout() {
    return async dispatch => {
        try {
            const games = await UserService.logout();
            dispatch('LOGOUT')
        } catch (err) {
        }
    };
}

export function loadUser(userId) {
    return async dispatch => {
        try {
            const user = await UserService.query(userId);
            dispatch(setUser(user));
        } catch (err) {
        }
    };
}

export function setUser(user) {
    return {
        type: 'SET_USER',
        user
    };
}

function _removeUser(userId) {
    return {
        type: 'USER_REMOVE',
        userId
    };
}

