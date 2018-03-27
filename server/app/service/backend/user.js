const bcrypt = require('bcryptjs');

const Controller = require('egg').Controller;

class UserController extends Controller {

  async create(userModel) {
    userModel.created_at = userModel.updated_at = Date.now();
    const salt = bcrypt.genSaltSync(10);
    userModel.password = bcrypt.hashSync(userModel.password, salt);
    delete userModel.confirm;
    const result = await this.app.mysql.insert('user', userModel);
    return result.affectedRows === 1;
  }

  async login(userModel) {
    const result = await this.app.mysql.get('user', { username: userModel.username });
    return result;
  }
}
module.exports = UserController;
