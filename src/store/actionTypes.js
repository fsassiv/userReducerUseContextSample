/*
Para grandes aplicações o mais recomendavel é que cada action create esteja em seu próprio .js
Ex: userActionTypes.js, historyActionType.js
*/

export const UserActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SIGN_UP_NEW_USER: "SIGN_UP_NEW_USER",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER"
};

export const HistoryActionTypes = {
  SET_USER_ARTIST: "SET_USER_ARTIST",
  SET_USER_HISTORY:"SET_USER_HISTORY"
};
