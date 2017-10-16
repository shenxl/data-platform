'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/company/:cid', app.controller.company.info);


  app.get('/users', 'user.users');
  app.get('/users/:id', 'user.user');
  app.put('/users/:id', 'user.update');
  app.del('/users/:id', 'user.del');

  app.get('/posts', 'post.posts');
  app.get('/posts/:id', 'post.post');
  app.post('/users/:user_id/posts', 'post.create');
  app.put('/users/:user_id/posts/:id', 'post.update');
  app.del('/users/:user_id/posts/:id', 'post.del');

  // auth 相关流程

  app.get('/auth/login', 'user.login');
  app.get('/auth/register', 'user.registerPage');
  app.get('/auth/logout', 'user.logout');

  const options = {
    successRedirect: 'http://localhost:8000',
    failureRedirect: '/auth/login',
    failureFlash: true
  };

  const local = app.passport.authenticate('local', options);
  app.post('/auth/login', local);
  app.post('/auth/register', 'user.register');

};
