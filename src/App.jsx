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
<<<<<<< HEAD
    <Router>
      <Switch>
        <Route path='/dashAdmin' exact component={DashAdmin} />
        <Route path='/login' exact component={Login} />
        
      </Switch>
    </Router>
=======
    
      <Router >
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/login' exact component={Login} />
          <UserContext.Provider value={{ user,setUser }}>
            <Route path='/dashAdmin' exact component={DashAdmin} />
          </UserContext.Provider>
        </Switch>
      </Router>
    

>>>>>>> 7a6c3e3e641ec6378831cfa333740f327d42418c
  );
}

export default App;
