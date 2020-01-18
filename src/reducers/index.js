import { combineReducers } from 'redux';
import gameReducer from './gameReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  gameStore: gameReducer,
  userStore: userReducer
})

export default rootReducer;