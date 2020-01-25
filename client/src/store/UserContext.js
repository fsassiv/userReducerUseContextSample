import React, { useReducer, createContext } from "react";
import { INITIAL_STATE, userReducer } from "./UserReducer";

export const UserContext = createContext();

const UserContextComponent = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextComponent;
