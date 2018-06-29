//imports
import { combineReducers } from 'redux';
import operations from './operations';
//initial states
let userLoggedIn = {};
let userWallets = {};

//reducers
const userLogged = (state = userLoggedIn, action) => {
  switch (action.type) {
    case 'USER_LOGGED':
      userLoggedIn = action.data;
      console.log(action.data);
      return userLoggedIn;
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

const getWallets = (state = userWallets, action) => {
  switch (action.type) {
  case 'GET_WALLETS':
    console.log(action.data, 'XXXX')
    userWallets = action.data;
    return userWallets;
  default:
    return state;

  }
};
//export reducers
export const reducers = combineReducers({
  userLogged,
  operations,
  getWallets
});
