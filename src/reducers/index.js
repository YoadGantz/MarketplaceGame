import { combineReducers } from 'redux';
import gameReducer from './gameReducer'
import UserReducer from './userReducer'

const rootReducer = combineReducers({
  game: gameReducer,
  user: UserReducer
})

export default rootReducer;