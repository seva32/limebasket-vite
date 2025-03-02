/* eslint-disable indent */
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
  ORDER_PAY_RESET,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from "../../actions/shop/shopActionTypes/orderActionTypes";

const initialState = { loading: null, order: {}, success: "", error: "" };

function orderCreateReducer(state = initialState, action: any) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialStateOrderDetails = { loading: null, order: {}, error: "" };

function orderDetailsReducer(state = initialStateOrderDetails, action: any) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialStateMyOrderList = {
  orders: [],
  loading: null,
  error: "",
};

function myOrderListReducer(state = initialStateMyOrderList, action: any) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderListReducer(
  state = {
    orders: [],
  },
  action: any
) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialStateOrderPay = {
  order: {},
  loading: null,
  success: null,
  error: "",
};

function orderPayReducer(state = initialStateOrderPay, action: any) {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
        error: "",
      };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return initialStateOrderPay;
    default:
      return state;
  }
}

const initialStateOrderDelete = {
  order: {},
  loading: null,
  success: null,
  error: "",
};

function orderDeleteReducer(state = initialStateOrderDelete, action: any) {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: "",
        order: action.payload,
      };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
};
