import React, { useState, useEffect, lazy, Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import UserContext from "./context/user/user-context";
import Spinner from "./components/spinner/Spinner";
import { UserContext } from "./store/UserReducer";

//Routes
const Home = lazy(() => import("./pages/home/Home.jsx"));
const Login = lazy(() => import("./pages/login/Login.jsx"));

function App(props) {
  const [user, setUser] = useState("oi");
  const { userState, userDispatch } = useContext(UserContext);
  // const { user } = userState;

  useEffect(() => {
    console.log(userState);
  }, []);

  setTimeout(() => {
    userDispatch({
      type: "SET_CURRENT_USER",
      payload: { name: "Sinner From App.js" }
    });
  }, 1000);

  return (
    <Router>
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
          {/* <Route exact path="/reactmusic/login" component={Login} /> */}
          {/* Catch all route */}
          {/* <Route path="/*" render={() => <Redirect to="/reactmusic" />} /> */}
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
