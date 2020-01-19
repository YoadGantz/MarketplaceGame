let localLoggedInUser = null;
if (sessionStorage.user) localLoggedInUser = JSON.parse(sessionStorage.user);

const INITIAL_STATE = {
    loggedInUser: localLoggedInUser
};

export default function userReducer(state = INITIAL_STATE, action) {
    
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedInUser: action.user };
        case 'UPDATE_USER':
            return { ...state, loggedInUser: action.user };
        case "LOGOUT":
            return { ...state, loggedInUser: null };
        default:
            return state;
    }
}
