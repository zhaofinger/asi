
import * as user from './action-type';

let defaultState = {
};

export const userData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.SET_USER_DATA:
      return {...state, ...action.value};
    default:
      return state;
  }
}