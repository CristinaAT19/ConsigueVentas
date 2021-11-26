import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Dashboard from './VistasAdmin/Dashboard';
import App from '../components/TablaEmpleados';
import { administracionEmpleados, restablecimientoContraseña, tablaFaltas, calendarioEmpleados, listaAdministradores } from './VistasAdmin/Empleados'

function DashAdmin() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Router basename={''}>
      {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Switch >
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/tablaFaltas' exact component={tablaFaltas} />
        </Switch>
      </Router>
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />
            
            <App/>
            {/* <Dashboard/> */}

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

            </div>

          </div>
        </main>



      </div>
    </div>
  );
}

export default DashAdmin;