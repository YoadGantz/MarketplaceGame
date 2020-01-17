import { combineReducers } from 'redux';
import gameReducer from './gameReducer'
import UserReducer from './userReducer'

const rootReducer = combineReducers({
  gameStore: gameReducer,
  userStore: UserReducer
})

export default rootReducer;