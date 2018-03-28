import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from '../public/lib/history';

import Layout from '../components/Layout/Layout';

import Login from '../page/Login/Login';
import Index from '../page/Index/Index';

// const RouteWithLayout = ({ layout, component, ...rest }) => {
//   return (
//     !layout ?
//       <Route {...rest} component={component} />
//       : <Route {...rest} render={(props) =>
//         React.createElement(layout, props, React.createElement(component, props))
//       } />
//   );
// };

export default class RouteConfig extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Layout>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/index" component={Index} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </Switch>
      </Router>
    )
  }
}
