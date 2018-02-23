'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', app.controller.home.index);
  require('./router/backend')(app);
  require('./router/frontend')(app);
};
