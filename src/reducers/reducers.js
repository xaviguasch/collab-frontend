//imports
import { combineReducers } from 'redux';

//initial states
let userLoggedIn = {};
let userWallets = {};

//reducers
const userLogged = (state = userLoggedIn, action) => {
  switch (action.type) {
  case 'USER_LOGGED':
  // console.log(action.data);
    userLoggedIn = action.data;
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
    userWallets = action.data;
    return userWallets;
  default:
    return state;

  }
};

//export reducers
export const reducers = combineReducers({
  userLogged,
  getWallets
});
