'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    let userModel = this.ctx.request.body
    const result = await this.ctx.service.backend.user.create(userModel);
    this.ctx.body = { result };
    this.ctx.status = 200;
  };
  async login() {};
  async logout() {};
  async destory() {};
};

module.exports = UserController;
