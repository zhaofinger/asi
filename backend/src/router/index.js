import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from '../public/lib/history';

import Layout from '../components/Layout/Layout';

import Login from '../page/Login/Login';
import Index from '../page/Index/Index';

export default class RouteConfig extends Component {
  render() {
    return (
      <Router history={history}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/index" component={Index} />
              <Redirect to="/" />
            </Switch>
          </Layout>
      </Router>
    )
  }
}
