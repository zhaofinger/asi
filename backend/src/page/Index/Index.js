import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.scss';


class Index extends Component {
  static propTypes = {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div id="index">
        <h1>欢迎来到首页</h1>
        <h2>name: { this.props.userData.username }</h2>
        <h2>email: { this.props.userData.email }</h2>
      </div>
    );
  }
}

export default connect(state => ({
  userData: state.userData,
}), {
})(Index);
