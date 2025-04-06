/* eslint-disable no-underscore-dangle */
import axios, { AxiosError } from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_SEARCH_KEY,
} from "./shopActionTypes/productActionTypes";
import authHeader from "../../../utils/misc/auth-header";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

export const listProducts =
  (category = "", searchKeyword = "", sortOrder = "") =>
  async (dispatch: (action: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `${url}/shop/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`,
        {
          headers: authHeader(),
        }
      );

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

      return data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.log("ProductList action err: ", error);
      dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
      throw error;
    }
  };

export const saveProduct =
  (product: any, callback: any) => async (dispatch: any) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      if (!product._id) {
        const { data } = await axios.post(`${url}/shop/products`, product, {
          headers: authHeader(),
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: "" });
        return callback();
      }
      const { data } = await axios.put(
        `${url}/shop/products/${product._id}`,
        product,
        {
          headers: authHeader(),
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: "" });
      return callback();
    } catch (error: any) {
      dispatch({
        type: PRODUCT_SAVE_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const detailsProduct = (productId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(`${url}/shop/products/${productId}`, {
      headers: authHeader(),
    });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

export const deleteProduct =
  (productId: any, callback: any) => async (dispatch: any) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete(`${url}/shop/products/${productId}`, {
        headers: authHeader(),
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
      // update product list after deletion
      dispatch(listProducts());
      return callback();
    } catch (error: any) {
      console.log("Error on delete: ", error);
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const saveProductReview =
  (productId: any, review: any) => async (dispatch: any) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post(
        `${url}/shop/products/${productId}/reviews`,
        review,
        {
          headers: authHeader(),
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_REVIEW_SAVE_FAIL,
        payload:
          error && error.response ? error.response.data.message : error.message,
      });
    }
  };

export const setSearchProductKey = (key: any) => ({
  type: PRODUCT_SEARCH_KEY,
  payload: key,
});
