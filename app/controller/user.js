'use strict';

module.exports = app => {
  return class UserController extends app.Controller {

    * login() {
      const { ctx } = this;
      yield ctx.render('login.nj', { msg: [] });
    }

    * registerPage() {
      const { ctx } = this;
      yield ctx.render('register.nj', { msg: [] });
    }

    * logout() {
      const { ctx } = this;
      ctx.body = '退出页面';
    }

    * register() {
      const { ctx, logger, config } = this;
      const userRole = {
        login: 'string',
        password: 'string'
      };
      try {
        ctx.validate(userRole);
        const register = yield ctx.service.user.create(ctx.request.body);
        const mailOptions = {
          from: config.email.client.auth.user,
          to: register.login,
          subject: 'hello world',
          html: '<a href = \'link\'>点击链接进行验证</a>'
        };
        logger.info('mailOptions: ', mailOptions);
        yield ctx.service.email.sendMail(mailOptions);
        ctx.status = 302;
        ctx.redirect('/auth/login');
      } catch (err) {
        logger.warn(err.errors);
        yield ctx.render('register.nj',
        { msg: err.errors,
          data: ctx.request.body });
      }
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
