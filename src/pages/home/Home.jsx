import React, { useEffect, useContext } from "react";
// import UserContext from "../../context/user/user-context";
import { UserContext } from "../../store/UserReducer";
import { HistoryContext } from "../../store/HistoryReducer";

const Home = props => {
  const { userState, userDispatch } = useContext(UserContext);
  const { historyState, historyDispatch } = useContext(HistoryContext);
  useEffect(() => {
    console.log(userState, historyState);
    userDispatch({ type: "SET_CURRENT_USER", payload: { name: "Sinner" } });
    historyDispatch({ type: "SET_CURRENT_USER", payload: { name: "History" } });
  }, []);
  // console.log(userState, historyState);
  return <div>Home</div>;
};

export default Home;
