import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import homeBg from "../../assets/index-bg-dt.jpg";

import "./LoginDesktop.scss";
import Login from "../../components/forms/Login";
import SignUp from "../../components/forms/SignUp";

const LoginDesktop = () => {
  const [loginActive, setLoginActive] = useState(true);

  const hanldeBtnClick = event => {
    event.preventDefault();
    const id = event.target.id;

    setLoginActive(true);
    if (id !== "login-btn") {
      setLoginActive(false);
    }
  };

  return (
    <div className="login login--desktop">
      <Grid container>
        <Grid item md={7} lg={8}>
          <div
            className="login--desktop__section wallpaper"
            style={{ backgroundImage: `url(${homeBg})` }}
          >
            oi
          </div>
        </Grid>
        <Grid item md={5} lg={4}>
          <div className="login--desktop__section dark">
            <div className="login--desktop__form-wrapper">
              <div className="login--desktop__btn-group">
                <a
                  href="#"
                  id="login-btn"
                  className={`login--desktop__btn ${loginActive && "active"}`}
                  onClick={hanldeBtnClick}
                >
                  Já possuo uma conta
                </a>
                <a
                  href="#"
                  id="signup-btn"
                  className={`login--desktop__btn ${!loginActive && "active"}`}
                  onClick={hanldeBtnClick}
                >
                  Criar nova conta
                </a>
              </div>
              {/* Render the form accordantly to the loginActive state */}
              {loginActive ? <Login /> : <SignUp />}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginDesktop;
