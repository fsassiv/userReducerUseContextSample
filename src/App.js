import React, { useState, useEffect, lazy, Suspense, useContext } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import { UserContext } from "./store/UserContext";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { UserActionTypes } from "./store/actionTypes";
import { createUserHistory, getResultFromHistory } from "./api/history";

//Routes
const Home = lazy(() => import("./pages/home/Home.jsx"));
const Login = lazy(() => import("./pages/login/Login.jsx"));

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#000"
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#fff"
    }
  },
  shape: {
    borderRadius: 0
  }
});

function App(props) {
  const { userState, userDispatch } = useContext(UserContext);
  const history = useHistory();
  const [userHistory, setUserHistory] = useState("");

  useEffect(() => {
    //check if the users db is set, if not create it
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }

    const currentUser = JSON.parse(sessionStorage.getItem("currentSession"));
    //Check for a logged user
    if (currentUser) {
      userDispatch({
        type: UserActionTypes.SET_CURRENT_USER,
        payload: currentUser
      });
    } else {
      //Redirect not logged user
      history.push("/reactmusic/login");
    }

    //make sure the userHistory is set
    createUserHistory();
  }, []);

  //get currentUserHistory
  useEffect(() => {
    if (userState.user) {
      setUserHistory(getResultFromHistory(userState.user.id));
    }
  }, [userState]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" render={() => <Redirect to="/reactmusic" />} />
          <Route
            exact
            path="/reactmusic"
            render={() =>
              userState.user !== null ? (
                <Home />
              ) : (
                <Redirect to="/reactmusic/login" />
              )
            }
          />
          <Route
            exact
            path="/reactmusic/login"
            render={() =>
              userState.user === null ? (
                <Login />
              ) : (
                <Redirect to="/reactmusic" />
              )
            }
          />
          {/* Catch all route */}
          <Route path="*" render={() => <Redirect to="/reactmusic" />} />
        </Suspense>
      </Switch>
      {/* </Router> */}
    </ThemeProvider>
  );
}

export default App;
