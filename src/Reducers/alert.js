import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const intialState = [];

export default function (state = intialState, action) {
  let { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      /*       console.log("payload: ", payload);
      console.log("state: ", state); */
      let dif = false;
      for (let i = 0; i < state.length; i++) {
        if (state[i].msg === payload.msg) {
          dif = true;
        }
      }
      if (dif === false) {
        return [...state, payload];
      } else {
        return [...state];
      }

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id === payload.id);

    default:
      return state;
  }
}
