'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Authorization = app.model.define('authorization', {
    uid: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    provider: STRING(32),
    created_at: DATE,
    updated_at: DATE
  });

  Authorization.associate = function() {
    app.model.Authorization.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Authorization;
};
