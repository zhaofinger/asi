import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user.scss';


class User extends Component {
  static propTypes = {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div id="user">
      </div>
    );
  }
}

export default connect(state => ({
}), {
})(User);
