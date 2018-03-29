import ajax from '../public/lib/ajax';

export const getToken = data => {
  return ajax('/file/token', 'get', data);
};