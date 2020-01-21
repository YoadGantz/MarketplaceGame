import { combineReducers } from 'redux';
import gameReducer from './gameReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  gameStore: gameReducer,
  userStore: userReducer,
  cartStore: cartReducer
})

export default rootReducer;