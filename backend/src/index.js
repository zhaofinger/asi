import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Switch } from 'react-router-dom';
import history from './public/lib/history';

import { Provider } from 'react-redux';
import store from './store/store';

import registerServiceWorker from './registerServiceWorker';

import Login from './page/Login/Login';
import Index from './page/Index/Index';

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
    history.push('/index');
  }
};
checkLogin();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/index" component={Index} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
