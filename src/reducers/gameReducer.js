const INITIAL_STATE = {
  games: [], filterBy: { publisher: '' }, wishedGames: []
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_GAMES":
      return {
        ...state,
        games: action.games
      };
    case 'SET_FILTER':
      return { ...state, filterBy: { ...action.filterBy } }
    default:
      return state;
  }
}
