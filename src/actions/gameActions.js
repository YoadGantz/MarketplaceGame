import GameService from '../services/GameService';

function setGames(games) {
    return {
        type: 'SET_GAMES',
        games
    }
}


export function loadGames(filterBy) {
    return async dispatch => {
        try {
            console.log(filterBy,'at game actions');
            
            const games = await GameService.query(filterBy);
            dispatch(setGames(games));

        } catch (err) {
            console.log('GameActions: err in loadGames', err);
        }
    };
}