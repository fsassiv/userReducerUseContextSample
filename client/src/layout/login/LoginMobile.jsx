import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import loginBgMb from "../../assets/index-bg-mb.jpg";
import brandMb from "../../assets/brand-mb.jpg";
import AppButton from "../../components/misc/AppButton";

import "./LoginMobile.scss";
import Login from "../../components/forms/Login";
import SignUp from "../../components/forms/SignUp";

const LoginMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loginForm, setLoginForm] = useState(true);

  const handleAppButtonClick = ({ targetForm }) => {
    //Set login by default
    setLoginForm(true);
    if (targetForm !== "login") {
      //Set signup
      setLoginForm(false);
    }
    setOpenDrawer(true);
  };

  return (
    <div
      style={{ backgroundImage: `url(${loginBgMb})` }}
      className="login login--mobile"
    >
      <img
        className="login--mobile-brand"
        src={brandMb}
        alt="reactMusic - brand"
      />
      <div className="login--mobile__btn-wrapper">
        <AppButton
          btnLabel="Entrar"
          btnHandleClick={() => handleAppButtonClick({ targetForm: "login" })}
        />
        <AppButton
          btnLabel="Criar nova conta"
          btnHandleClick={() => handleAppButtonClick({ targetForm: "signup" })}
        />
      </div>
      {/* Form Drawer */}
      <Drawer
        open={openDrawer}
        anchor="bottom"
        onClose={() => setOpenDrawer(false)}
      >
        {/* check if the login form is set to true, if not, render de signup */}
        {loginForm ? <Login /> : <SignUp />}
      </Drawer>
    </div>
  );
};

export default LoginMobile;
