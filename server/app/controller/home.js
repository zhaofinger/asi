'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'ASI SERVER IS RUN.';
  }
}

module.exports = HomeController;
