import userService from "../services/userService";


function login(user) {
    return {
        type: 'LOGIN',
        user
    }
}

export function login(cred) {
    return async dispatch => {
        try {
            const user = await userService.login(cred);
            dispatch(login(user));

        } catch (err) {
        }
    };
}

export function signup(cred) {
    return async dispatch => {
        try {
            const user = await userService.signup(cred);
            dispatch(login(user));

        } catch (err) {
        }
    };
}
export function logout() {
    return async dispatch => {
        try {
            const games = await userService.logout(cred);
            dispatch('LOGOUT')

        } catch (err) {
        }
    };
}
