import React, { useEffect, lazy, Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import { UserContext } from "./store/UserContext";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { UserActionTypes } from "./store/actionTypes";
import { getCurrentSession } from "./api/users";

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

  useEffect(() => {
    //check if the users db is set, if not create it
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }

    userDispatch({
      type: UserActionTypes.SET_CURRENT_USER,
      payload: getCurrentSession()
    });
  }, []);

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
          <Route path="*" render={() => <Redirect to="/" />} />
        </Suspense>
      </Switch>
      {/* </Router> */}
    </ThemeProvider>
  );
}

export default App;
