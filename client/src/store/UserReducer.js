import { UserActionTypes } from "./actionTypes";
import { logOut } from "../api/users";

export const INITIAL_STATE = {
  user: null,
  error: null
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
    case UserActionTypes.SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case UserActionTypes.LOGOUT_USER:
      //remove the session from the localstorage
      logOut();
      return { ...state, user: null };
    default:
      return state;
  }
};
