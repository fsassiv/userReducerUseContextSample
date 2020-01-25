import React, { useReducer, createContext } from "react";
import { INITIAL_STATE, historyReducer } from "./HistoryReducer";

export const HistoryContext = createContext();

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
