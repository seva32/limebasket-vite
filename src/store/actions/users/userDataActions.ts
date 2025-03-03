import axios from "axios";
import {
  GET_USER_DATA,
  GET_USER_DATA_ERROR,
  GET_CURRENT_USER,
} from "./userDataTypes";
import authHeader from "../../../utils/misc/auth-header";

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
  payload: JSON.parse(localStorage.getItem("user") || "") || {},
});

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

export const getUserData = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${url}/users`, {
      headers: authHeader(),
    });
    dispatch({ type: GET_USER_DATA, payload: response.data });
    dispatch({
      type: GET_USER_DATA_ERROR,
      payload: "",
    });
  } catch (e) {
    dispatch({
      type: GET_USER_DATA_ERROR,
      payload: "User data not available!",
    });
  }
};
