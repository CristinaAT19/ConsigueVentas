import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  BrowserRouter,
  Router
} from 'react-router-dom';

// import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

// import {UserContext} from '../src/components/context/UserContext';
import { useState } from 'react';
// Import pages
import DashAdmin from './pages/DashAdmin';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/dashadmin' exact component={DashAdmin} />
        {/* <Route path='/admin' exact component={Dashboard} /> */}
      </Switch>
    </>
  );
}

export default App;
