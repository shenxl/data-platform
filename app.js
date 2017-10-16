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
    const profile =
      yield ctx.service.user.login({
        login: user.login,
        password: user.password });
    return profile;
  });

  app.Controller = BaseController;
};
