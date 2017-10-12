'use strict';

// had enabled by egg
// exports.static = true;
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  passport: {
    enable: true,
    package: 'egg-passport'
  }
};
