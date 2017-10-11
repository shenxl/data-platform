'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/company/:cid', app.controller.company.info);
};
