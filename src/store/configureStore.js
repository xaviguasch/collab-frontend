import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers/reducers';
import logger from 'redux-logger';
import apiService from './middlewares/apiService';
import { BASE_URL } from '../config/api.config';
import { loadState, saveState } from './localStorageHelper';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  loadState(),
  composeEnhancers(applyMiddleware( apiService(BASE_URL))),
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
