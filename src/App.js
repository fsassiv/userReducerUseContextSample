import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import UserContext from "./context/user/user-context";
import Spinner from "./components/spinner/Spinner";
import UserContextComponent from "./store/UserReducer";
import HistoryContextComponent from "./store/HistoryReducer";

//Routes
const Home = lazy(() => import("./pages/home/Home.jsx"));
const Login = lazy(() => import("./pages/login/Login.jsx"));

function App() {
  const [user, setUser] = useState("oi");

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <UserContextComponent>
      <HistoryContextComponent>
        <Router>
          <Switch>
            <Suspense fallback={<Spinner />}>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/reactmusic" />}
              />
              <Route
                exact
                path="/reactmusic"
                render={() =>
                  user !== null ? <Home /> : <Redirect to="/reactmusic/login" />
                }
              />
              <Route exact path="/reactmusic/login" component={Login} />
              {/* Catch all route */}
              <Route path="/*" render={() => <Redirect to="/reactmusic" />} />
            </Suspense>
          </Switch>
        </Router>
      </HistoryContextComponent>
    </UserContextComponent>
  );
}

export default App;
