import React, { useState } from "react";
import AppInput from "../../misc/AppInput";
import { Typography } from "@material-ui/core";
import "./Login.scss";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
        Criar nova conta
      </Typography>
      <AppInput
        inputTarget="name"
        inputPlaceholder="Informe seu nome"
        handleChange={handleInputChange}
        inputValue={credentials.name}
      />
      <AppInput
        inputTarget="email"
        inputPlaceholder="Informe seu email"
        handleChange={handleInputChange}
        inputValue={credentials.email}
      />
      <AppInput
        inputTarget="password"
        inputPlaceholder="Digite uma senha"
        handleChange={handleInputChange}
        inputValue={credentials.password}
      />
      <AppInput
        inputTarget="confirmPassword"
        inputPlaceholder="Digite novamente a senha"
        handleChange={handleInputChange}
        inputValue={credentials.confirmPassword}
      />
      <button className="login--mobile__login-submit-btn" type="submit">
        Criar conta
      </button>
    </form>
  );
};

export default SignUp;
