import React, { useState } from "react";
import "./HistoryContainer.scss";
// import HistoryArtistList from "./HistoryArtistList";
// import HistoryAlbumList from "./HistoryAlbumList";
import HistoryList from "./HistoryList";

const HistoryContainer = props => {
  const [tabOne, setTabOne] = useState(true);

  const handleTabBtnClick = event => {
    event.preventDefault();

    //by default set tabOne to true
    setTabOne(true);
    if (event.target.id !== "tab-one-btn") {
      setTabOne(false);
    }
  };

  return (
    <div className="history">
      <div className="history__top">
        Últimos pesquisados:
        <a
          href="#"
          id="tab-one-btn"
          onClick={handleTabBtnClick}
          className={`history__tab-btn ${tabOne && "active"}`}
        >
          Artistas
        </a>
        <a
          href="#"
          id="tab-two-btn"
          onClick={handleTabBtnClick}
          className={`history__tab-btn ${!tabOne && "active"}`}
        >
          Álbuns
        </a>
      </div>
      <div className="history__tab-wrapper">
        {/* {tabOne ? <HistoryArtistList /> : <HistoryAlbumList />} */}
        {/* <HistoryList listLabel listSrc={[]} /> */}
      </div>
    </div>
  );
};

export default HistoryContainer;
