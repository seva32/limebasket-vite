import axios from "axios";
import {
  GET_USER_DATA,
  GET_USER_DATA_ERROR,
  GET_CURRENT_USER,
} from "./userDataTypes";
import { Dispatch, AnyAction } from "redux";
import authHeader from "../../../utils/misc/auth-header";

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
  payload: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : {},
});

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

export const getUserData = () => async (dispatch: Dispatch<AnyAction>) => {
  const headers = authHeader();
  try {
    const response = await axios.get(`${url}/users`, {
      headers,
    });
    dispatch({ type: GET_USER_DATA, payload: response.data });
    dispatch({
      type: GET_USER_DATA_ERROR,
      payload: "",
    });
  } catch (err: unknown) {
    console.error("Error fetching user data:", err);
    dispatch({
      type: GET_USER_DATA_ERROR,
      payload: "User data not available!",
    });
  }
};
