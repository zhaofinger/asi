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
      where: { is_delete: 0 },
      limit: num,
      offset: (page - 1) * num,
      orders: [['created_at','desc'], ['id','desc']]
    });
    const total = await this.app.mysql.count('audio');
    return { list, total };
  }

  async show(id) {
    const result = await this.app.mysql.get('audio', { id });
    return result;
  }

  async update(audioModel) {
    const result = await this.app.mysql.update('audio', audioModel);
    return result.affectedRows === 1;
  }

}
module.exports = UserController;
