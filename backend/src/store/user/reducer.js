
import * as user from './action-type';

let defaultState = {
};

export const userData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SET_USER_DATA:
      return {...state, ...action.value};
    case user.REMOVE_USER_DATA:
      return {};
    default:
      return state;
  }
}