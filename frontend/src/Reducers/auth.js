import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATION_FAIL,
  AUTHENTICATION_SUCCESS,
  LOGOUT,
  USER_NOT_LOADED,
  USER_LOADED,
} from "../actions/types";

const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  tasks: null,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        tasks: payload,
      };
    case REGISTER_SUCCESS:
    case AUTHENTICATION_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTHENTICATION_FAIL:
    case LOGOUT:
    case USER_NOT_LOADED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        tasks: null,
      };
    default:
      return state;
  }
}
