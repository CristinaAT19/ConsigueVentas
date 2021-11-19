// import './App.css';
// import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
// import Overview from './pages/Overview';
// import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';

import DashAdmin from "./pages/DashAdmin";
import Login from './pages/Login';

// import Team from './pages/Team';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/dashAdmin' exact component={DashAdmin} />
        <Route path='/login' exact component={Login} />
        
      </Switch>
    </Router>
    

  );
}

export default App;
