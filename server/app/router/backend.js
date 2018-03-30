module.exports = app => {
  const { router, controller } = app;
  // router.resources('user', '/api/user', app.controller.backend.user);
  // user
  router.post('/api/user/register', app.controller.backend.user.register);
  router.post('/api/user/login', app.controller.backend.user.login);
  router.post('/api/user/logout', app.controller.backend.user.logout);
  router.get('/api/user/is-login', app.controller.backend.user.isLogin);
  // file
  router.get('/api/file/token', app.controller.backend.file.generateToken);
  // audio
  app.router.resources('audio', '/api/audio', app.controller.backend.audio);

  // router.delete('/api/user/destory', app.controller.backend.user.remove);
};
