const INITIAL_STATE = {
  game: null, games: [], filterBy: { publisher: '' }
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_GAMES":
      return { ...state, games: action.games };
    case 'SET_FILTER':
      return { ...state, filterBy: { ...action.filterBy } }
    case 'SET_GAME':
      return { ...state, game: action.game }
    default:
      return state;
  }
}
