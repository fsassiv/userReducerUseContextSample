import React from "react";
import SpinnerGif from "../../assets/spinner.gif";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={SpinnerGif} alt="spinner" />
    </div>
  );
};

export default Spinner;
