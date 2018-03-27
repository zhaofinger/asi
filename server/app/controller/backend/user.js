'use strict';
const bcrypt = require('bcryptjs');

const Controller = require('egg').Controller;

class UserController extends Controller {

  async register() {
    let userModel = this.ctx.request.body;
    const result = await this.ctx.service.backend.user.create(userModel);
    this.ctx.body = { data: result, status: 201 };
  }

  async login() {
    let userModel = this.ctx.request.body;
    const result = await this.ctx.service.backend.user.login(userModel);
    if (!result) {
      this.ctx.body = { message: '用户未注册！', status: 404 };
    } else {
      if (bcrypt.compareSync(userModel.password, result.password)) {
        delete result.password;
        const jwt = this.app.jwt.sign(JSON.parse(JSON.stringify(result)), this.app.config.jwt.secret);
        this.ctx.body = {
          status: 200,
          data: result
        };
        this.ctx.cookies.set('jwt_token', jwt);
      } else {
        this.ctx.body = { message: '请输入正确的用户名或密码！', status: 403 };
      }
    }
  }

  /**
   * 校验登录，未登录情况中间件那边会处理，故此处只需返回成功用户信息
   */
  async isLogin() {
    let jwtToken = this.ctx.cookies.get('jwt_token');
    if (jwtToken) {
      this.ctx.body = {
        status: 200,
        data: this.app.jwt.verify(jwtToken, this.app.config.jwt.secret)
      };
    }
  }

  async logout() {}
  async destory() {}
};

module.exports = UserController;
