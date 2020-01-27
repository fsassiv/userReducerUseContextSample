import React, { useEffect, useState } from "react";
import AppListItem from "../../components/misc/AppListItem";

const SearchList = ({ listSrc, listType }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (listSrc) {
      for (const type in listSrc) {
        setList(listSrc[type]);
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
