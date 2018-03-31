const bcrypt = require('bcryptjs');

const Controller = require('egg').Controller;

class UserController extends Controller {

  async create(audioModel) {
    audioModel.created_at = audioModel.updated_at = Date.now();
    const result = await this.app.mysql.insert('audio', audioModel);
    if (result.affectedRows === 1) {
      return result.insertId;
    }
    return false;
  }

  async list(page, num = 10) {
    num = Number(num);
    const list = await this.app.mysql.select('audio', {
      limit: num,
      offset: (page - 1) * num,
    });
    const total = await this.app.mysql.count('audio');
    return { list, total };
  }

}
module.exports = UserController;
