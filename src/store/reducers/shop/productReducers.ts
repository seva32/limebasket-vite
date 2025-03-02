/* eslint-disable indent */
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
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_RESET,
  PRODUCT_SEARCH_KEY,
  PRODUCT_SEARCH_KEY_RESET,
} from "../../actions/shop/shopActionTypes/productActionTypes";

const initialStateList = { loading: null, products: [], error: "" };

function productListReducer(state = initialStateList, action: any) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialStateDetails = {
  product: { reviews: [] },
  loading: null,
  error: "",
};

function productDetailsReducer(state = initialStateDetails, action: any) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialStateDelete = {
  product: {},
  loading: null,
  success: null,
  error: "",
};

function productDeleteReducer(state = initialStateDelete, action: any) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
        error: "",
      };
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        product: {},
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const initialStateSave = {
  product: {},
  loading: null,
  success: null,
  error: "",
};

function productSaveReducer(state = initialStateSave, action: any) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_SAVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialStateReviewSave = {
  review: {},
  loading: null,
  success: null,
  error: "",
};

function productReviewSaveReducer(state = initialStateReviewSave, action: any) {
  switch (action.type) {
    case PRODUCT_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case PRODUCT_REVIEW_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_SAVE_RESET:
      return initialStateReviewSave;
    default:
      return state;
  }
}

const initialStateProductSearchKey = {
  key: "",
};

function productSearchKeyReducer(
  state = initialStateProductSearchKey,
  action: any
) {
  switch (action.type) {
    case PRODUCT_SEARCH_KEY:
      return { key: action.payload };
    case PRODUCT_SEARCH_KEY_RESET:
      return initialStateProductSearchKey;
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  productSearchKeyReducer,
};
