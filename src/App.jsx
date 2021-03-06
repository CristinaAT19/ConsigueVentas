import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

import { useState } from "react";
import DashAdmin from "./pages/DashAdmin";
import Login from "./pages/Login";
import RoutePrivate from "./routes/RoutePrivate";
import RoutePublic from "./routes/RoutePublic";
import { distGetAutentication, distSetAutentication } from "./dist/Autentication";
import { UserContext } from "./components/context/UserContext";

function App() {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  useEffect(() =>{
    if(distGetAutentication()==null){
      distSetAutentication(false);      
    }
  }, [user]);
  
  return (
    <>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/login">
            <RoutePublic>
              <Login />
            </RoutePublic>
          </Route>

          <Route path="/*">
            <RoutePrivate>
              <DashAdmin/>
            </RoutePrivate>
          </Route>
        </UserContext.Provider>

        {/* <Route path='/admin' exact component={Dashboard} /> */}
      </Switch>
    </>
  );
}

export default App;
