import UserService from '../services/UserService';

export function login(cred) {
    return async dispatch => {
        try {
            const user = await UserService.login(cred);
            dispatch(setUser(user));
            return;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

export function logout() {
    return async dispatch => {
        try {
            await UserService.logout();
            dispatch(setUser(null))
            return;
        } catch (err) {
            console.log('Had issues in logging out', err)
            throw err;
        }
    };
}

export function signUp(cred) {
    return async dispatch => {
        try {
            const user = await UserService.signup(cred);
            dispatch(setUser(user));
            return;
        } catch (err) {
            console.log('Had issues in signing up', err)
            throw err;
        }
    };
}


export function loadUser(userId) {
    return async dispatch => {
        try {
            const user = await UserService.query(userId);
            dispatch(setUser(user));
            return;
        } catch (err) {
            console.log('Had issues in getting user', err)
            throw err;
        }
    };
}

export function updateUser(user) {
    return async dispatch => {
        try {
            const updatedUser = await UserService.update(user);
            dispatch(_updateUser(updatedUser));
            return;
        } catch (err) {
            console.log('Had issues in updating user', err)
            throw err;
        }
    };
}

export function setUser(user) {
    return {
        type: 'SET_USER',
        user
    };
}

function _updateUser(user) {
    return {
        type: 'UPDATE_USER',
        user
    }
}
