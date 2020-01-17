const INITIAL_STATE = {
    logedinUser: {},
};

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                logedinUser: action.user
            };
        case "LOGOUT":
            return {
                ...state,
                logedinUser: {}
            };
        default:
            return state;
    }
}
