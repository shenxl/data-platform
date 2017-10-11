'use strict';

module.exports = app => {
  return class Company extends app.Service {
    * find(cid) {
      const company = yield app.mysql.get('company', {
        id: cid
      });
      return {
        company
      };
    }
  };
};
