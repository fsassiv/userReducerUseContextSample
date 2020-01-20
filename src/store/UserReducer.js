import { UserActionTypes } from "./actionTypes";

export const INITIAL_STATE = {
  user: null,
  error: null
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case UserActionTypes.LOGIN_USER:
      return { ...state, user: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
