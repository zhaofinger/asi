module.exports = app => {
  const { router, controller } = app;
  // router.resources('user', '/api/user', app.controller.backend.user);

  router.post('/api/user/register', app.controller.backend.user.register);
  router.post('/api/user/login', app.controller.backend.user.login);
  router.get('/api/user/is-login', app.controller.backend.user.isLogin);
  router.post('/api/user/logout', app.controller.backend.user.logout);
  // router.delete('/api/user/destory', app.controller.backend.user.remove);
};
