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

// mysql 配置
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '127.0.0.1',
    // 端口号
    port: '3306',
    // 用户名
    user: 'node',
    // 密码
    password: '',
    // 数据库名
    database: 'asi',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

// 跨域
exports.security = {
  domainWhiteList: ['localhost:3000'],
  csrf: false,
};
exports.cors = {
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true,
};

// 七牛配置
exports.qiniu = {
  accessKey: 'xxxxxx',
  secretKey: 'xxxxxx',
  scope: 'asi-dev'
};
