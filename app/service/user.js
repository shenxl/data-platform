'use strict';

module.exports = app => {
  return class User extends app.Service {
    * list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
      return yield this.ctx.model.User.findAndCountAll({
        offset,
        limit,
        order: [[ order_by, order.toUpperCase() ]]
      });
    }
    * login(userInfo) {
      const user = yield this.ctx.model.User.findById(userInfo.login);
      if (!user) {
        this.ctx.session.loginMessage = { status: 'error', message: '用户名不存在', code: '000100' };
        return {};
      }
      if (!this.checkPwd(userInfo.password, user.password)) {
        this.ctx.session.loginMessage = { status: 'error', message: '密码不正确', code: '000101' };
        return {};
      }
      this.ctx.session.loginMessage = null;
      return user;
    }
    * find(id) {
      const user = yield this.ctx.model.User.findById(id);
      if (!user) {
        this.ctx.throw(404, 'user not found');
      }
      return user;
    }

    * create(user) {
      return yield this.ctx.model.User.create(user);
    }

    * update({ id, updates }) {
      const user = yield this.ctx.model.User.findById(id);
      if (!user) {
        this.ctx.throw(404, 'user not found');
      }
      return yield user.update(updates);
    }

    * del(id) {
      const user = yield this.ctx.model.User.findById(id);
      if (!user) {
        this.ctx.throw(404, 'user not found');
      }
      return user.destroy();
    }

    checkPwd(input, database) {
      return input === database;
    }
  };
};
