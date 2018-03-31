'use strict';
const Controller = require('egg').Controller;

class AudioController extends Controller {

  constructor(ctx) {
    super(ctx);

    this.createRule = {
      title: 'string',
      author: 'string',
      src: 'string',
      poster: 'string',
      desc: 'string',
      origin: { type: 'string', required: false }
    };
  }

  async index() {
    const { ctx } = this;

    ctx.validate({
      page: { type: 'string', format: /\d+/, required: false },
      num: { type: 'string', format: /\d+/, required: false },
    }, ctx.query);

    const { page, num } = ctx.query;

    const data = await ctx.service.backend.audio.list(page, num);

    ctx.body = {
      status: 200,
      data
    };

  }

  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const id = await ctx.service.backend.audio.create(ctx.request.body);

    ctx.body = { data: { id }, status: 201 };
  }

  async update() {}

}

module.exports = AudioController;
