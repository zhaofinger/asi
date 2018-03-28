import ajax from '../public/lib/ajax';

export function login(data) {
  return ajax('/user/login', 'post', data);
};

export function logout() {
  return ajax('/user/logout', 'post');
};

export function isLogin() {
  return ajax('/user/is-login', 'get');
};