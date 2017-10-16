'use strict';

module.exports = app => {
  return class UserController extends app.Controller {

    * login() {
      const { ctx } = this;
      yield ctx.render('login.ejs');
    }

    * logout() {
      const { ctx } = this;
      ctx.body = '退出页面';
    }

    * register() {
      const { ctx, logger } = this;
      if (ctx.request.body) {
        try {
          const created = yield ctx.service.user.create(ctx.request.body);
          ctx.status = 302;
          ctx.redirect('/auth/login');
        } catch (err) {
          logger.error(err);
          yield ctx.render('register.ejs');
        }
      }
      yield ctx.render('register.ejs');
    }

    * users() {
      const ctx = this.ctx;
      ctx.body = yield ctx.service.user.list(ctx.query);
    }

    * user() {
      const ctx = this.ctx;
      ctx.body = yield ctx.service.user.find(ctx.params.id);
    }

    * update() {
      const ctx = this.ctx;
      const login = ctx.params.id;
      const body = ctx.request.body;
      ctx.body = yield ctx.service.user.update({ login, updates: body });
    }

    * del() {
      const ctx = this.ctx;
      const id = ctx.params.id;
      yield ctx.service.user.del(id);
      ctx.status = 200;
    }
  };
};
