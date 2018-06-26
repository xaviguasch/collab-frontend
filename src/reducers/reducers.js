//imports
import { combineReducers } from "redux";

//initial states

const user = [];

//reducers
const userLogged = (state = user, action) => {
switch (action.type) {
  case 'GET_USER':
    return {
      user.push(action.data)
    }
    break;
  default:

}};

//export reducers
export const reducers = (state, action) => {
  console.log(state);
};
