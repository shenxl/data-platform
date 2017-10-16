'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const { ctx, logger } = this;
      logger.info(ctx.user);
      ctx.body = 'hi, ' + ctx.user.login;
    }
  }
  return HomeController;
};
