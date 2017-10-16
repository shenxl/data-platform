'use strict';
const assert = require('assert');
const Strategy = require('passport-local').Strategy;

module.exports = app => {
  class BaseController extends app.Controller {
    get user() {
      return this.ctx.session.user;
    }
    success(data) {
      this.ctx.body = {
        success: true,
        data
      };
    }
    notFound(msg) {
      msg = msg || 'not found';
      this.ctx.throw(404, msg);
    }
  }

  app.beforeStart(function* () {
    yield app.model.sync({ force: false });
  });

  const config = app.config.passportLocal;
  app.passport.use('local', new Strategy(config,
    (req, login, password, done) => {
      const user = {
        login,
        password,
        provider: 'local'
      };
      app.passport.doVerify(req, user, done);
    }));


  app.passport.verify(function* (ctx, user) {
    // check user
    assert(user.provider, 'user.provider should exists');
    assert(user.login, 'user.login should exists');
    switch (user.provider) {
      case 'local': {
        const existsUser = yield ctx.model.User.findByLogin(user.login);
        if (existsUser) {
          // ctx.logger.info('用户:', existsUser);
          const validPwd = existsUser.validPassword(user.password);
          if (!validPwd) {
            ctx.res.errmsg = { message: '密码错误' };
            ctx.logger.info('SET RES:', ctx.res.errmsg);
            return false;
          }
          return existsUser;
        }
        ctx.set('err-msg', { message: '用户不存在' });
        return false;
      }
      default:
        return false;
    }
  });

  app.Controller = BaseController;
};
