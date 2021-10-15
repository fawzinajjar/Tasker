import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATION_FAIL,
  AUTHENTICATION_SUCCESS,
  LOGOUT,
} from "../actions/types";

export const registerSuccess = (payload) => {
  return {
    type: REGISTER_SUCCESS,
    payload: payload,
  };
};

export const registerFail = () => {
  return {
    type: REGISTER_FAIL,
  };
};
export const authenticationSuccess = (payload) => {
  return {
    type: AUTHENTICATION_SUCCESS,
    payload: payload,
  };
};

export const authenticationFail = () => {
  return {
    type: AUTHENTICATION_FAIL,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
