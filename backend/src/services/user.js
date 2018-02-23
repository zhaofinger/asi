import request from '../utils/request';

export async function register(params) {
  return request('/user/register', {
    method: 'POST',
    body: params,
  });
}

export async function login() {
  return request('/user/login', {
    method: 'POST',
    body: {
      email: 'zhbqsj@126.com',
      username: 'admin',
      password: '123456',
    },
  });
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
