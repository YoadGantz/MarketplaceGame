import HttpService from "./HttpService";

export default {
  login,
  signUp,
  logout,
  add,
  remove,
  getById
}

async function login(loginCred) {
  const loggedInUser = await HttpService.post('auth/login', loginCred)
  return loggedInUser
}

async function signUp(signUpCred) {
  const loggedInUser = await HttpService.post('auth/signup', signUpCred)
  return loggedInUser
}

async function logout() {
  const loggedOutUser = await HttpService.post('auth/logout')
  return loggedOutUser
}

function remove(userId) {
  return HttpService.delete(`user/${userId}`);
}

async function add(user) {
  const addedUser = await HttpService.post(`user`, user);
  return addedUser
}

async function getById(userId) {
  return HttpService.get(`/${userId}`);
}