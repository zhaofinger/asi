'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_asi_biu_biu_biu';

  // add your config here
  config.name = 'asi';
  config.middleware = ['errorHandler', 'checkLogin'];
  config.jwt = {
    secret: "asi_biu_biu_biu!"
  };

  return config;
};
