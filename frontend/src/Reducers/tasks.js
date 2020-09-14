import React from "react";
import { ADD_TASK_SUCCESS, ADD_TASK_FAIL } from "../actions/types";

const intialState = {
  loading: true,
};

export default function (state = intialState, action) {
  const { payload, type } = action;
  switch (type) {
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_TASK_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
