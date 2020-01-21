import React, { useState } from "react";
import AppInput from "../../misc/AppInput";
import { Typography } from "@material-ui/core";
import "./Login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = ({ target, value }) => {
    //Update credentials accordantly
    setCredentials({ ...credentials, [target]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Submit", credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="login--mobile__form">
      {" "}
      <Typography
        variant="h4"
        align="center"
        gutterBottom={true}
        style={{ fontWeight: "lighter" }}
      >
        Entrar
      </Typography>
      <AppInput
        inputTarget="email"
        inputPlaceholder="Informe seu email"
        handleChange={handleInputChange}
        inputValue={credentials.email}
      />
      <AppInput
        inputTarget="password"
        inputPlaceholder="Informe sua senha"
        handleChange={handleInputChange}
        inputValue={credentials.password}
      />
      <button className="login--mobile__login-submit-btn" type="submit">
        Entrar
      </button>
    </form>
  );
};

export default Login;
