import { HistoryActionTypes } from "./actionTypes";

export const INITIAL_STATE = {
  history: [],
  error: null
};

//copia do userReducer, somente para testar nested Context
export const historyReducer = (state, action) => {
  switch (action.type) {
    case HistoryActionTypes.SET_RESULT:
      return { ...state, history: action.payload };
    default:
      return state;
  }
};
