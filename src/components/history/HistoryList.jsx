import React, { useEffect } from "react";
import "./HistoryList.scss";
// import AppListItem from "../../misc/AppListItem";

const HistoryList = ({ listType, listSrc }) => {
  useEffect(() => {
    listSrc.reverse();
  }, []);

  return (
    <div className="list__item-wrapper">
      {/* <AppListItem item itemTheme="light" /> */}
      {listSrc.map(item => (
        <p className="list__item-item" key={item}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default HistoryList;
