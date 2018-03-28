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

/**
 * 退出登录
 * @param {*} value
 */
export const removeUserData = value => {
  return {
    type: user.REMOVE_USER_DATA,
    value,
  }
}