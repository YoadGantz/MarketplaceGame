const INITIAL_STATE = {
  cartItems: [],
  currItem: null
};

export default function cartReducer(state = INITIAL_STATE, action) {
  const { cartItems } = state;
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cartItems: [...cartItems, { ...action.item }]
      };
    case "SET_CURR_ITEM":
      return {
        ...state,
        currItem: action.item
      };
    case "REMOVE_FROM_CART":
      const { id } = action;
      const idx = cartItems.findIndex(item => item._id === id);
      return {
        ...state,
        cartItems: [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)]
      };

    default:
      return state;
  }
}
