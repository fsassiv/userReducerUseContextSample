import React, { useReducer, createContext } from "react";
export const UserContext = createContext();

const INITIAL_STATE = {
  user: null,
  error: null
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, user: action.payload };
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

const UserContextComponent = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextComponent;
