import GameService from '../services/GameService';

function setGames(games) {
    return {
        type: 'SET_GAMES',
        games
    }
}

function setWishedGames(games) {
    return {
        type: 'SET_WISHED_GAMES',
        games
    }
}

export function loadWishedGames(filterBy) {
    return async dispatch => {
        try {
            const games = await GameService.query(filterBy);
            dispatch(setWishedGames(games));
        } catch (err) {
            
        }
    }
}

export function loadGames(filterBy) {
    return async dispatch => {
        try {

            const games = await GameService.query(filterBy);
            dispatch(setGames(games));

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