import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import registerServiceWorker from './registerServiceWorker';

import history from './public/lib/history';
import Route from './router/';

import './public/style/base.scss';

import { isLogin } from './api/user';

// 校验是否登录
const checkLogin = async () => {
  let result = await isLogin();
  if (result) {
    store.dispatch({
      type: 'SET_USER_DATA',
      value: result
    });
    if (window.location.pathname.includes('login')) {
      history.push('/index');
    }
  }
};
checkLogin();

ReactDOM.render(
  <Provider store={store}>
    <Route />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
