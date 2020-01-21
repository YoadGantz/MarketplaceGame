const INITIAL_STATE = {
  cart: []
};

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.cart
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item]
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: [...state.cart.filter(item => item !== action.item)]
      }
    case "CLEAR_CART":
      return {
        ...state,
        cart: []
      }
    default:
      return state;
  }
}
