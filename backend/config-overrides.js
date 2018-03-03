const { injectBabelPlugin } = require('react-app-rewired');
const rewireSass = require('react-app-rewire-sass');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = rewireSass(config, env);
  return config;
};