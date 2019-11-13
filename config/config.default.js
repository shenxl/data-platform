'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1504860942113_6820';
  // passport 配置
  config.passportLocal = {
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  };
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'demodb',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: ''
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'wpsactivity_bk'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
      '.nj': 'nunjucks'
    }
  };

  config.ejs = {
    root: path.join(appInfo.baseDir, 'app/view'),
    cache: true,
    debug: false,
    compileDebug: true,
    delimiter: null,
    strict: false
  };


  config.email = {
    app: true,
    client: {
      host: 'smtp.163.com',
      secureConnection: true,
      port: 465,
      auth: {
        user: '@163.com',
        pass: '12345qwert'
      }
    }
  };

  return config;
};
