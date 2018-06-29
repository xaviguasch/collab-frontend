//imports
import { combineReducers } from 'redux';
import operations from './operations';
//initial states
let userLoggedIn = {};
let userWallets = {};
let userTransaction = [];

//reducers
const userLogged = (state = userLoggedIn, action) => {
  switch (action.type) {
  case 'USER_LOGGED':
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
  case 'FETCH_CREATE_WALLET':
    return userWallets;
  case 'FETCH_CREATE_WALLET_SUCCESS':
    return {...state, ...action.data};
  default:
    return state;

  }
};

const getTransactions = (state = userTransaction, action) => {
  switch (action.type) {
  case 'GET_TRANSACTIONS':
    userTransaction = action.data;
    console.log(userTransaction);
    return userTransaction;

  default:
    return state;

  }
};

//export reducers
export const reducers = combineReducers({
  userLogged,
  operations,
  getWallets,
  getTransactions
});
