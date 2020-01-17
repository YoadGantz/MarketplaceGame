
export default {login,signup,logout}



async function login(logincred){
  const  loggedInUser= await HttpService.post('auth/login',logincred)
  return loggedInUser
}
async function signup(signupCred){
  const  loggedInUser= await HttpService.post('auth/signup',signupCred)
  return loggedInUser
}
async function logout(){
  const  loggedOutUSer= await HttpService.post('auth/logout')
  return loggedOutUSer
}

function remove(gameId) {
  return HttpService.delete(`user/${userId}`);
}
async function add(game) {
  const addedGame  = await HttpService.post(`user`, game);
  return  addedGame
}