import React from "react";
import UserContextComponent from "./UserContext";
import HistoryContextComponent from "./HistoryContext";

const GlobalStore = ({ children }) => (
  <UserContextComponent>
    <HistoryContextComponent>{children}</HistoryContextComponent>
  </UserContextComponent>
);

export default GlobalStore;
