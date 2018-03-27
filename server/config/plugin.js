'use strict';

// had enabled by egg
// exports.static = true;

// validate
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
// mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// cors
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// jwt
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};

// // passport
// exports.passport = {
//   enable: true,
//   package: 'egg-passport',
// };
