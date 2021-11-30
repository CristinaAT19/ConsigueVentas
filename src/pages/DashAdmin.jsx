import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Dashboard from './VistasAdmin/Dashboard';
import App from '../components/TablaEmpleados';
import { administracionEmpleados, restablecimientoContraseña, tablaFaltas, calendarioEmpleados, listaAdministradores } from './VistasAdmin/Empleados'
import TablaDatosPer from '../components/TablaDatosPer';
import TablaEmpleados from '../components/TablaEmpleados';
import CalendarioPersonal from '../components/CalendarioPersonal';
import CerrarSesion from '../components/CerrarSesion';

function DashAdmin() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    
    <div className="flex h-screen overflow-hidden">
      <Router >
      {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
        <Switch >
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/tablaFaltas' exact component={tablaFaltas} />
            <Route path='/datosPersonales' exact component={TablaDatosPer}/>
        
            {/* <Route path='/calendarioEmpleados' exact component={calendarioEmpleados} /> */}
            {/* <Route path='/listaAdministradores' exact component={listaAdministradores} /> */}
            {/* perfil */}
            {/* <Route path='/calendarioAsistencia' exact component={calendarioAsistencia} /> */}
            {/* calendario general */}
            <Route path='/restablecimientoContraseña' exact component={restablecimientoContraseña}/>
            <Route path='/calendarioGeneral' exact component={CalendarioPersonal} />
            <Route path='/tablaEmpleados' exact component={TablaEmpleados} />
            <Route path='/cerrarSesion' exact component={CerrarSesion} />
            {/* Auxliar de cerrar sesion */}
            <Route exact path='/redirectSesion' render={()=>(<Redirect to='/login' /> )}  />

            {/* En caso de redireccion a /dashboard */}
            <Route render={() => <Redirect to="/dashboard" />} />

        </Switch>


        </main>


      </div>
      </Router>
    </div>
  );
}

export default DashAdmin;