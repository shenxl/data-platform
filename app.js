'use strict';
const Strategy = require('passport-local').Strategy;

module.exports = app => {

  class CustomController extends app.Controller {
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


  app.Controller = CustomController;
  const config = app.config.passportLocal;
  app.passport.use('local', new Strategy(config,
    (req, username, password, done) => {
      const user = {
        name: username,
        password,
        provider: 'local'
      };
      app.passport.doVerify(req, user, done);
    }));


  app.passport.verify(function* (ctx, userInfo) {
    const profile =
      yield ctx.service.user.login({
        name: userInfo.name,
        pwd: userInfo.password });
    if (profile.message) {
      return false;
    }
    return profile;
  });
};
