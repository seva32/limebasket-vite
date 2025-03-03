import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from "./shopActionTypes/orderActionTypes";
import authHeader from "../../../utils/misc/auth-header";

const baseURL = 'http://localhost:4939/lime-api';

export const createOrder =
  (order: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
      const {
        data: { data: newOrder },
      } = await axios.post(
        `${baseURL}/shop/orders`,
        order,
        {
          headers: authHeader(),
        }
      );
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error: any) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const listMyOrders = () => async (dispatch: any) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { data } = await axios.get(
      `${baseURL}/shop/orders/user`,
      {
        headers: authHeader(),
      }
    );
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: MY_ORDER_LIST_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const listOrders = () => async (dispatch: any) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get(
      `${baseURL}/shop/orders`,
      {
        headers: authHeader(),
      }
    );
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.response.data.message });
  }
};

export const detailsOrder =
  (orderId: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
      const { data } = await axios.get(
        `${
          baseURL
        }/shop/orders/${orderId}`,
        {
          headers: authHeader(),
        }
      );
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const payOrder =
  (order: any, paymentResult: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
      const { data } = await axios.put(
        // eslint-disable-next-line no-underscore-dangle
        `${baseURL}/shop/orders/${
          order._id
        }/pay`,
        paymentResult,
        {
          headers: authHeader(),
        }
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data.order });
    } catch (error: any) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const deleteOrder =
  (orderId: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
      const { data } = await axios.delete(
        `${baseURL}/shop/orders/${orderId}`,
        {
          headers: authHeader(),
        }
      );
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ORDER_DELETE_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };
