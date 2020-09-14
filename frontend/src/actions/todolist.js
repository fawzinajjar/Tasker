import { ADD_TASK_SUCCESS, ADD_TASK_FAIL } from "../actions/types";

export const addTaskSuccess = (payload) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: payload,
  };
};

export const addTaskFail = (payload) => {
  return {
    type: ADD_TASK_FAIL,
    payload: payload,
  };
};
