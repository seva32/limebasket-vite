/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
  CART_CLEAR,
} from "../../actions/shop/shopActionTypes/cartActionTypes";

const initialState = { cartItems: [], shipping: {}, payment: {} };

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const product = state.cartItems.find(
        (x: any) => x.product === item.product
      );
      if (product) {
        return {
          ...state,
          // prettier-ignore
          cartItems: state.cartItems.map((x: any) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (x.product === product.product ? item : x)), // eslint-disable-line
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x: any) => x.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    case CART_CLEAR:
      return initialState;
    default:
      return state;
  }
};
