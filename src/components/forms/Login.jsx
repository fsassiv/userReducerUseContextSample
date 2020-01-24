import React, { useState, useEffect, useContext } from "react";
import AppInput from "../../misc/AppInput";
import { Alert } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { logUser } from "../../api/users";
import { UserContext } from "./../../store/UserContext";
import { UserActionTypes } from "./../../store/actionTypes";
import "./Login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [userDB, setUserDB] = useState([]);

  const userContext = useContext(UserContext);

  //Get the curretn state of userDB
  useEffect(() => {
    setUserDB(JSON.parse(localStorage.getItem("users")));
  }, []);

  const handleInputChange = ({ target, value }) => {
    //Update credentials accordantly
    setCredentials({ ...credentials, [target]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const currentUser = logUser(credentials);

    if (currentUser.length > 0) {
      userContext.userDispatch({
        type: UserActionTypes.SET_CURRENT_USER,
        payload: {
          id: currentUser[0].id,
          name: currentUser[0].name,
          email: currentUser[0].email
        }
      });
    } else {
      setAlert(true);
      setAlertText("Email nao encontrado e/ou senha inválida");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login--mobile__form">
      {alert && (
        <Alert variant="filled" color="error">
          {alertText}
        </Alert>
      )}
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
