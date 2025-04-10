/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
import axios, { AxiosError } from "axios";
import {
  AUTH_USER, // para auth el user y para nuevo refreshToken
  AUTH_ERROR_SIGNUP,
  AUTH_ERROR_SIGNIN,
  AUTH_EXPIRY_TOKEN,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_RESTART_TIMEOUT,
  ACCESS_TOKEN_DELETE_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from "./authActionTypes";
import {
  GET_USER_DATA,
  GET_USER_DATA_ERROR,
  GET_CURRENT_USER,
} from "../users/userDataTypes";
import getMessage from "../../../utils/misc/getErrorMessage";
import { Dispatch, AnyAction } from "redux";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
  timeout: 10000,
});

// if (process.env.NODE_ENV !== 'production') {
//   instance.interceptors.request.use(
//     (request) => {
//       console.log('((((((((((( request )))))))))))', request);
//       return request;
//     },
//     (error) => Promise.reject(error),
//   );

//   instance.interceptors.response.use((response) => {
//     console.log('((((((((((( response )))))))))))', response);
//     return response;
//   });
// }

export const signup =
  (formProps: any, callback: (result: boolean) => void) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await instance.post("/auth/signup", formProps, {
        headers: {},
      });
      const dateNow = Date.now();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data, startTime: dateNow })
      );
      dispatch({ type: AUTH_USER, payload: response.data.accessToken });
      dispatch({
        type: AUTH_EXPIRY_TOKEN,
        payload: {
          expiryToken: response.data.expiryToken,
          startTime: dateNow,
        },
      });
      callback(true);
    } catch (e: unknown) {
      const err = e as AxiosError;
      const message =
        err?.response?.data?.message || ("Email in use" as string);
      dispatch({ type: AUTH_ERROR_SIGNUP, payload: message });
      callback(false);
    }
  };

export const signout =
  (callback: () => void) => async (dispatch: Dispatch<AnyAction>) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      try {
        await instance.post(
          "/auth/signout",
          {
            email: user.email,
          },
          {
            headers: {},
          }
        );
        // console.log(`${user.email} signout success: ${response.data.ok}`);
      } catch (e) {
        // console.log(`${user.email} signout failure. ${e}`);
        dispatch({
          type: ACCESS_TOKEN_DELETE_ERROR,
          payload: { e, user }, // logging
        });
      } finally {
        localStorage.removeItem("user");
      }
    }
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut().then(
          auth2.disconnect().then(() => {
            console.log("Signed out from google...");
          })
        );
      }
    }
    dispatch({ type: AUTH_USER, payload: "" });
    dispatch({ type: AUTH_ERROR_SIGNUP, payload: "" });
    dispatch({ type: AUTH_ERROR_SIGNIN, payload: "" });
    dispatch({ type: AUTH_EXPIRY_TOKEN, payload: {} });
    dispatch({ type: GET_USER_DATA, payload: {} });
    dispatch({ type: GET_USER_DATA_ERROR, payload: "" });
    dispatch({ type: GET_CURRENT_USER, payload: {} });
    dispatch({ type: RESET_PASSWORD_ERROR, payload: "" });
    dispatch({ type: CHANGE_PASSWORD_ERROR, payload: "" });
    return callback(); // callback for token expire timeout countdownHOC
  };

export const signin =
  (formProps: any, callback: (result: boolean) => void) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await instance.post("/auth/signin", formProps, {
        headers: {},
      });
      const dateNow = Date.now();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data, startTime: dateNow })
      );
      dispatch({ type: AUTH_USER, payload: response.data.accessToken });
      dispatch({
        type: AUTH_EXPIRY_TOKEN,
        payload: {
          expiryToken: response.data.expiryToken,
          startTime: dateNow,
        },
      });
      callback(true);
    } catch (err: unknown) {
      const message = getMessage(err as Error | AxiosError);
      dispatch({ type: AUTH_ERROR_SIGNIN, payload: message });
      callback(false);
    }
  };

export const refreshToken =
  (callback: (result: boolean) => void) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await instance.post(
        "/auth/refresh-token",
        {},
        {
          headers: {},
        }
      );
      const dateNow = Date.now();
      dispatch({ type: AUTH_USER, payload: response.data.accessToken });
      dispatch({
        type: AUTH_EXPIRY_TOKEN,
        payload: {
          expiryToken: response.data.expiryToken,
          startTime: dateNow,
        },
      });

      const user = JSON.parse(localStorage["user"]);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user, // keep other info without change
          accessToken: response.data.accessToken,
          startTime: dateNow,
          expiryToken: response.data.expiryToken,
        })
      );
      return callback(true);
    } catch (e) {
      dispatch({
        type: REFRESH_TOKEN_ERROR,
        payload: e, // logging
      });
      return callback(false);
    }
  };

export const resfreshTokenRestartTimeout = () => ({
  type: REFRESH_TOKEN_RESTART_TIMEOUT,
});

// formProps == email, reset es solamente para el envio de mail/link para change
export const resetPassword =
  (formProps: any, callback: (result: boolean) => void) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await instance.post("/auth/reset-password", formProps, {
        headers: {},
      });
      if (response) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: formProps,
        });
      }
      callback(true);
    } catch (e: unknown) {
      const err = e as AxiosError;
      console.warn("e ", err);
      dispatch({
        type: RESET_PASSWORD_ERROR,
        // res.status(404).send({ message: 'User Email Not found.' });
        payload: err.response?.data?.message,
      });
      callback(false);
    }
  };

// formProps email, token, oldPassword, newPassword
export const changePassword =
  (formProps: any, callback: (result: boolean) => void) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await instance.post("/auth/change-password", formProps, {
        headers: {},
      });
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data,
      });
      return callback(true);
    } catch (e: unknown) {
      const err = e as AxiosError;
      dispatch({
        type: CHANGE_PASSWORD_ERROR,
        payload: err?.response?.data.message,
      });
      return callback(false);
    }
  };
