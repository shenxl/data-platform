'use strict';

// had enabled by egg
// exports.static = true;
module.exports = {
// mysql plug
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },

// email plug
  email: {
    enable: true,
    package: 'egg-email'
  },

// model plug
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
// passport plug
  passport: {
    enable: true,
    package: 'egg-passport'
  },
// view plug
  view: {
    enable: true,
    package: 'egg-view'
  },

// ejs plug
  ejs: {
    enable: true,
    package: 'egg-view-ejs'
  },
// nunjucks plug
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
// 参数校验插件
  validate: {
    enable: true,
    package: 'egg-validate'
  }
};
