'use strict';

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
  domainWhiteList: ['127.0.0.1:8000'],
  csrf: false,
};

exports.cors = {
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true,
};
