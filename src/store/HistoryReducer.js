import React, { useReducer, createContext } from "react";
export const HistoryContext = createContext();

const INITIAL_STATE = {
  history: [],
  error: null
};

//copia do userReducer, somente para testar nested Context
export const historyReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, history: action.payload };
    case "LOGIN_USER":
      return { ...state, history: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

const HistoryContextComponent = ({ children }) => {
  const [historyState, historyDispatch] = useReducer(
    historyReducer,
    INITIAL_STATE
  );

  return (
    <HistoryContext.Provider value={{ historyState, historyDispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextComponent;
