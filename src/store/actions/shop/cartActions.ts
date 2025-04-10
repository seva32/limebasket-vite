/* eslint-disable consistent-return */
import axios from "axios";
import Cookies from "universal-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "./shopActionTypes/cartActionTypes";
import authHeader from "../../../utils/misc/auth-header";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

export const addToCart =
  (productId: any, qty: any, promo: any, callback: any) =>
  async (dispatch: any, getState: any) => {
    const cookies = new Cookies();
    try {
      const { data } = await axios.get(
        `${url}/shop/products/${productId}`,
        {
          headers: authHeader(),
        }
      );
      const payload = {
        product: data._id,
        name: data.name,
        image: data.image,
        description: data.description,
        price: data.price,
        category: data.category,
        countInStock: data.countInStock,
        qty,
        promo,
      }
      dispatch({
        type: CART_ADD_ITEM,
        payload,
      });
      const {
        cart: { cartItems },
      } = getState();
      cookies.set("cartItems", JSON.stringify(cartItems), {
        path: "/",
        sameSite: "strict",
      });
      return callback(payload);
    } catch {
      console.log("Product not found");
    }
  };

export const removeFromCart =
  (productId: any) => (dispatch: any, getState: any) => {
    const cookies = new Cookies();
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const {
      cart: { cartItems },
    } = getState();
    cookies.set("cartItems", JSON.stringify(cartItems), {
      path: "/",
      sameSite: "strict",
    });
  };

export const saveShipping = (data: any) => (dispatch: any) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

export const savePayment = (data: any) => (dispatch: any) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
