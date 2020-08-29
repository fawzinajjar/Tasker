import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";
import { setAlert } from "./alert";

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application.json",
    },
  };
  const body = { name, email, password };
  console.log("body: ", body);
  try {
    const res = await axios.post(
      "http://localhost:5000/register",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg), "danger");
      });
    }
  }
  dispatch({
    type: REGISTER_FAIL,
  });
};
