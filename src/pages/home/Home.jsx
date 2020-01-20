import React, { useEffect, useContext } from "react";
import { UserContext } from "../../store/UserContext";
import { HistoryContext } from "../../store/HistoryContext";
import { UserActionTypes } from "./../../store/actionTypes";

const Home = props => {
  const { userState, userDispatch } = useContext(UserContext);
  const { historyState, historyDispatch } = useContext(HistoryContext);

  useEffect(() => {
    console.log(userState, historyState);
  }, []);

  const handleClick = () => {
    userDispatch({ type: UserActionTypes.LOGOUT_USER });
  };
  return (
    <div>
      Home <button onClick={handleClick}>logOut</button>{" "}
    </div>
  );
};

export default Home;
