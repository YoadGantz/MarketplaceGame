const INITIAL_STATE = {
    games: [],
  };
  
  export default function gameReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "SET_GAMES":
        return {
          ...state,
          games: action.games
        };
      default:
        return state;
    }
  }
  