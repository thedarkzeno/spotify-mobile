import { createStore } from "redux";

const INITIAL_STATE = {
    results: {},
    refresh: false,
    token: ""
  };

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "Set_Results") {
    return { ...state, results: action.value };
  }
  if (action.type === "Set_Refresh") {
    return { ...state, refresh: action.value };
  }
  if (action.type === "Set_Token") {
    return { ...state, token: action.value };
  }
  return state;
}
const store = createStore(reducer);

export default store;