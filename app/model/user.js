'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    login: {
      type: STRING,
      primaryKey: true
    },
    name: STRING(30),
    password: STRING(32),
    email: STRING(255),
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE
  });

  User.findByLogin = function* (login) {
    return yield this.findOne({ login });
  };

  User.prototype.logSignin = function* () {
    yield this.update({ last_sign_in_at: new Date() });
  };

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Authorization, { as: 'authorizations', foreignKey: 'user_id' });
  };

  return User;
};
