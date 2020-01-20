import React, { useEffect, useContext } from "react";
import { UserContext } from "../../store/UserContext";
import { UserActionTypes } from "./../../store/actionTypes";
import { Hidden } from "@material-ui/core";
import LoginMobile from "../../layout/login/LoginMobile";
import LoginDesktop from "../../layout/login/LoginDesktop";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login">
      <Hidden smUp>
        <LoginMobile />
      </Hidden>
      <Hidden xsDown>
        <LoginDesktop />
      </Hidden>
    </div>
  );
};

export default Login;
