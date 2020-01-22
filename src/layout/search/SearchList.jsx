import React, { useEffect, useState } from "react";
import AppListItem from "./../../misc/AppListItem";

const SearchList = ({ listSrc, listType }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (listSrc) {
      if (listType === "artist") {
        if (listSrc.artist !== "undefined") {
          setList(listSrc.artist);
        }
      }
      if (listType === "album") {
        if (listSrc.album !== undefined) {
          setList(listSrc.album);
        }
      }
    }
  }, [listSrc, listType]);

  return (
    <div className="search__list-wrapper">
      {list.length > 0 &&
        list.map(item => (
          <AppListItem key={list.indexOf(item)} item={item} itemTheme="dark" />
        ))}
    </div>
  );
};

export default SearchList;
