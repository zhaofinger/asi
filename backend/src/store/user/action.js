import * as user from './action-type';

/**
 * 登录
 * @param {*} value
 */
export const setUserData = value => {
  return {
    type: user.SET_USER_DATA,
    value,
  }
}