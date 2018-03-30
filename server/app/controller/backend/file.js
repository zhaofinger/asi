'use strict';

const qiniu = require('qiniu');
const Controller = require('egg').Controller;

class FileController extends Controller {

  async generateToken() {
    let isImg = parseInt(this.ctx.request.query.is_img);
    const options = {
      scope: this.app.config.qiniu[isImg ? 'imgScope' : 'audioScope'],
      expires: 7200
    };
    const mac = new qiniu.auth.digest.Mac(this.app.config.qiniu.accessKey, this.app.config.qiniu.secretKey);
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);

    this.ctx.body = {
      status: 200,
      data: { token }
    };

  }

}

module.exports = FileController;
