'use strict';

module.exports = app => {
  class DataController extends app.Controller {
    * info(ctx) {
      const companyId = ctx.params.cid;
      const company = yield ctx.service.company.find(companyId);
      ctx.body = company;
    }
  }
  return DataController;
};
