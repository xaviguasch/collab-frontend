//imports
import { combineReducers } from "redux";

//initial states

const user = [];

//reducers
const userLogged = (state = user, action) => {
  console.log(state);
};

//export reducers
export const reducers = (state, action) => {
  console.log(state);
};
