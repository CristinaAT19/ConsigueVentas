// import './App.css';
// import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
// import Overview from './pages/Overview';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';

import DashAdmin from "./pages/DashAdmin";
import Login from './pages/Login';
// import Login1 from './pages/login-old';

// import Team from './pages/Team';
import {UserContext} from '../src/components/context/UserContext';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({});

  return (
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/login' exact component={Login} />
          <UserContext.Provider value={{ user,setUser }}>
            <Route path='/dashAdmin' exact component={DashAdmin} />
          </UserContext.Provider>


        </Switch>
      </Router>
    

  );
}

export default App;
