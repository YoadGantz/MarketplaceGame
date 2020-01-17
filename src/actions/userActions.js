import userService from "../services/userService";


function login(user) {
    return {
        type: 'SET_GAMES',
        user
    }
}


export function login(cred) {
    return async dispatch => {
        try {
            const user = await userService.login(cred);
            dispatch('LOGIN',(user));

        } catch (err) {
        }
    };
}

export function login(cred) {
    return async dispatch => {
        try {
            const user = await userService.signup(cred);
            dispatch('LOGIN',(user));

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
