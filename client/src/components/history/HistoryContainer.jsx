import React, { useState, useContext, useEffect } from "react";
import "./HistoryContainer.scss";
import { HistoryContext } from "../../store/HistoryContext";
import HistoryList from "./HistoryList";

const HistoryContainer = props => {
  const { historyState, historyDispatch } = useContext(HistoryContext);
  const [listSrc, setListSrc] = useState({});
  const [listType, setListType] = useState("artist");

  const handleTabBtnClick = event => {
    event.preventDefault();

    if (event.target.id !== "tab-one-btn") {
      setListType("album");
    } else {
      setListType("artist");
    }
  };

  useEffect(() => {
    if (historyState.history !== null) {
      if (listType === "artist") {
        setListSrc({ ...historyState.history });
        return;
      }
      //fallback to
      setListSrc({ ...historyState.history });
    }
  }, [historyState]);

  return (
    <div className="history">
      <div className="history__top">
        Últimos pesquisados:
        <a
          href="#"
          id="tab-one-btn"
          onClick={handleTabBtnClick}
          className={`history__tab-btn ${listType === "artist" && "active"}`}
        >
          Artistas
        </a>
        <a
          href="#"
          id="tab-two-btn"
          onClick={handleTabBtnClick}
          className={`history__tab-btn ${listType === "album" && "active"}`}
        >
          Álbuns
        </a>
      </div>
      {listSrc[listType] && (
        <HistoryList listType={listType} listSrc={listSrc[listType]} />
      )}
      {/* {!(Object.entries(listSrc).length>0 && listSrc[listType].length>0)?<p>Você ainda não possui históricos de busca...</p>:""} */}
    </div>
  );
};

export default HistoryContainer;
