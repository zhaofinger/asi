import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as user from './user/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({ ...user }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

export default store;