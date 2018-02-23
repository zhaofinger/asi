const bcrypt = require('bcryptjs');

const Controller = require('egg').Controller;
class UserController extends Controller {
  async create(userModel) {
    userModel.created_at = userModel.updated_at = Date.now();
    const salt = bcrypt.genSaltSync(10);
    userModel.password = bcrypt.hashSync(userModel.password, salt)
    delete userModel.confirm;
    const result = await this.app.mysql.insert('user', userModel);
    return result.affectedRows === 1;
  }
  async info() {
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}
module.exports = UserController;
