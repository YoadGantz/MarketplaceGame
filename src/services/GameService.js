import HttpService from "./HttpService";

export default {
  add,
  query,
  getById,
  update,
  remove
};

// const gGames = createGames();

function query(filterBy = '') {
  const games = HttpService.get('game', '', filterBy);
  return games
}

async function update(updatedGame){
  const game = await HttpService.put(`game/${updatedGame._id}`, updatedGame);
  return game
  
}

async function remove(gameId) {
  return await HttpService.delete(`game/${gameId}`);
}

async function add(game) {
  const addedGame  = await HttpService.post(`game`, game);
  return  addedGame
}

async function getById(gameId) {
  return HttpService.get(`game/${gameId}`);
}