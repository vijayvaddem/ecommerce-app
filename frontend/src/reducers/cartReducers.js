import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
/* 
1. Get the newly added item from payload
2. Find if the item already exist in the cart. If yes, return!? (No increase here?)

*/
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (currentItem) => currentItem.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
