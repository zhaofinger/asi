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

}
module.exports = UserController;
