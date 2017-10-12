'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(function* (db, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;

    yield db.createTable('users', {
      login: {
        type: STRING,
        primaryKey: true
      },
      name: STRING(30),
      password: STRING(32),
      last_sign_in_at: DATE,
      created_at: DATE,
      updated_at: DATE
    });
    yield db.createTable('posts', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: STRING(30),
      content: STRING(255),
      user_id: {
        type: STRING,
        references: {
          model: 'users',
          key: 'login'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      created_at: DATE,
      updated_at: DATE
    });
  }),

  down: co.wrap(function* (db) {
    yield db.dropTable('posts');
    yield db.dropTable('users');
  })
};
