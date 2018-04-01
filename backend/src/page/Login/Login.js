import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon } from 'antd';
import { login, isLogin } from '../../api/user';
import { setUserData } from '../../store/user/action';

import PropTypes from 'prop-types';

import './login.scss';

const FormItem = Form.Item;

class Login extends Component {
  static propTypes = {
    setUserData: PropTypes.func.isRequired
  }

  async componentWillMount() {
    if (!this.props.userData.username) return;
    // 校验是否登录
    let result = await isLogin();
    if (result) {
      this.props.setUserData(result);
      if (this.props.history.length > 2) {
      //   this.props.history.goBack();
      // } else {
        this.props.history.push('/index');
      }
    }
  }

  componentDidMount() {
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let result = await login(values);
        if (result) {
          this.props.setUserData(result);
          this.props.history.push('/index');
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login">
        <h1>登录</h1>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="请输入您的用户名"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="请输入您的密码"/>
            )}
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" htmlType="submit">登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);

export default connect(state => ({
  userData: state.userData,
}), {
  setUserData,
})(WrappedLogin);
