'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517993372331_8111';

  // add your config here
  config.middleware = ['errorHandler'];

  return config;
};

// 错误处理
module.exports = {
  // 加载 errorHandler 中间件
  middleware: [ 'errorHandler' ],
  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: '/api',
  },
};
