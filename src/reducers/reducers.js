//imports
import { combineReducers } from "redux";

//initial states

const user = [];

//reducers
const userLogged = (state = user, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        user: user.push(action.data)
      };
      break;
    default:
  }
};

//export reducers
export const reducers = combineReducers({
  user: userLogged
});
