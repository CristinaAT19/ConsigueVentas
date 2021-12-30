import React, { useEffect } from "react";
import { HashRouter as Switch, Route, useLocation } from "react-router-dom";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

import { useState } from "react";
import DashAdmin from "./pages/DashAdmin";
import Login from "./pages/Login";
import RoutePrivate from "./routes/RoutePrivate";
import RoutePublic from "./routes/RoutePublic";
import {
  distGetAutentication,
  distSetAutentication,
} from "./dist/Autentication";
import { UserContext } from "./components/context/UserContext";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    if (distGetAutentication() == null) {
      distSetAutentication(false);
    }
  }, [user]);

  return (
    <>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route exact path="/login">
            <RoutePublic>
              <Login />
            </RoutePublic>
          </Route>

          <Route exact path="/">
            <RoutePublic>
              <Login />
            </RoutePublic>
          </Route>

          <Route exact path="/home">
            <RoutePrivate>
              <Home />
            </RoutePrivate>
          </Route>

          <Route path="/dashadmin">
            <RoutePrivate>
              <DashAdmin/>
            </RoutePrivate>
          </Route>                    
          {/* <Route path="/*">
            <RoutePrivate>
              <DashAdmin/>
            </RoutePrivate>
          </Route>           */}
        </UserContext.Provider>

        {/* <Route path='/admin' exact component={Dashboard} /> */}
      </Switch>
    </>
  );
}

export default App;
