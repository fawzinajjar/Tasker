import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATION_FAIL,
  AUTHENTICATION_SUCCESS,
  LOGOUT,
  USER_LOADED,
  USER_NOT_LOADED,
} from "../actions/types";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const registerSuccess = (payload) => {
  return {
    type: REGISTER_SUCCESS,
    payload: payload,
  };
};

export const registerFail = (payload) => {
  return {
    type: REGISTER_FAIL,
    payload: payload,
  };
};
export const authenticationSuccess = (payload) => {
  return {
    type: AUTHENTICATION_SUCCESS,
    payload: payload,
  };
};

export const authenticationFail = (payload) => {
  return {
    type: AUTHENTICATION_FAIL,
    payload: payload,
  };
};
export const logout = (payload) => {
  return {
    type: LOGOUT,
  };
};
// User Load
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/dashboard");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_NOT_LOADED,
    });
  }
};
