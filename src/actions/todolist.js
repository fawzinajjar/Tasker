import { ADD_TASK_SUCCESS, ADD_TASK_FAIL } from "../actions/types";

export const addTaskSuccess = () => {
  return {
    type: ADD_TASK_SUCCESS,
  };
};

export const addTaskFail = () => {
  return {
    type: ADD_TASK_FAIL,
  };
};
