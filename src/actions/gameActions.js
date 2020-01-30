import GameService from '../services/GameService';

function setGames(games) {
    return {
        type: 'SET_GAMES',
        games
    }
}

function setGame(game) {
    return {
        type: 'SET_GAME',
        game
    }
}




export function loadGames(filterBy) {
    return async dispatch => {
        try {
            const games = await GameService.query(filterBy);
            dispatch(setGames(games));
            return games

        } catch (err) {
            console.log('Had issues getting games', err);
        }
    };
}

export function loadGame(id) {
    return async dispatch => {
        try {
            const game = await GameService.getById(id);
            dispatch(setGame(game));
            return game
        } catch (err) {
            console.log(err)
        }
    };
}
export function updateGame(newGame) {
    return async dispatch => {
        try {
            const game = await GameService.update(newGame);
            dispatch(setGame(newGame));
            return game
        } catch (err) {
        }
    };
}
export function updateComments(newGame) {
    return  dispatch => {
        try {
            dispatch(setGame(newGame));
            return newGame
        } catch (err) {
        }
    };
}

function setFilter(filterBy) {
    return {
        type: 'SET_FILTER',
        filterBy
    }
}
export function setFilterBy(filterBy) {
    return (dispatch) => dispatch(setFilter(filterBy))
}