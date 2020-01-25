import React from "react";
import "./AppListItem.scss";

const AppListItem = ({ item, itemTheme }) => {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`list__item ${itemTheme}`}
    >
      <img src={item.image[1]["#text"]} alt="" className="list__item-cover" />
      <div className="list__item-info">
        <p className="list__item-label">{item.name}</p>
        {item.listeners ? (
          <span className="list__item-stats">{item.listeners} ouvintes</span>
        ) : (
          <span className="list__item-stats">{item.artist}</span>
        )}
      </div>
    </a>
  );
};

export default AppListItem;
