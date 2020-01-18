import HttpService from "./HttpService";

export default {
  // add,
  query,
  getById
  // remove
};

// const gGames = createGames();

function query(filterBy = '') {
  const games = HttpService.get('game', '', filterBy);
  return games
}

// function remove(gameId) {
//   return HttpService.delete(`game/${gameId}`);
// }
// async function add(game) {
//   const addedGame  = await HttpService.post(`game`, game);
//   return  addedGame
// }

async function getById(gameId) {
  return HttpService.get(`game/${gameId}`);
}