import React, { useState, useEffect, useContext } from "react";
import AppInput from "../../misc/AppInput";
import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./Login.scss";
import { createNewUser } from "./../../api/users";
import { UserContext } from "./../../store/UserContext";
import { UserActionTypes } from "./../../store/actionTypes";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    //check if all the fields ware supplied
    for (const field in credentials) {
      if (credentials[field] === "") {
        setAlert(true);
        setAlertText("Certifique-se de preencher todos os campos");
        return;
      } else {
        setAlert(false);
        setAlertText("");
      }
    }

    //check if the passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setAlert(true);
      setAlertText(
        "Os campos senhas e confirmação de senhas estão divergentes"
      );
      return;
    }

    //check if email is already in use
    const registeredUser = userDB.filter(user => {
      if (user.email === credentials.email) {
        return user;
      }
    });

    if (registeredUser.length > 0) {
      setAlert(true);
      setAlertText("O email informado já está registrado");
      return;
    } else {
      const newUser = createNewUser(credentials);
      //uptade the state
      setUserDB(JSON.parse(localStorage.getItem("users")));
      //update the context and redirect to home
      userContext.userDispatch({
        type: UserActionTypes.SET_CURRENT_USER,
        payload: { ...newUser }
      });
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
