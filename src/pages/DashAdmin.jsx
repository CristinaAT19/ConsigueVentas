import axios from "axios";
import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Dashboard from './VistasAdmin/Dashboard';
import { administracionEmpleados, restablecimientoContraseña, tablaFaltas, calendarioEmpleados, listaAdministradores } from './VistasAdmin/Empleados'
import TablaDatosPer from '../components/TablaDatosPer';
import CerrarSesion from '../components/CerrarSesion';
import { UserContext } from "../components/context/UserContext";
import { getToken, removeToken } from "../dist/Token";
import { distSetAutentication } from "../dist/Autentication";
import CalendarioPersonal from "../components/CalendarioPersonal";
import { calendarioAsistencia } from "./VistasAdmin/Perfil";
import Configuracion from '../components/Configuracion';

import ControlInactividad from "../components/Inactividad";

function DashAdmin() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  //////////////////
              useEffect(() => {
                const interval = setInterval(ControlInactividad, 10000);
                //const interval = setInterval(ControlInactividad(), 10000);
                return () => clearInterval(interval);
              }, []); 
  //////////////////
  // const { user,setUser } = useContext(UserContext);

  // Peticion para ver y ocultar campos
  // const seeMyRoutes =  () => {

  //   axios.get(`${process.env.REACT_APP_API_URL}/api/seeMyRoutes`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     })
  //     .then(response => {
  //       setUser({...user, tipoUsuario: response.data.soloTipoUsuario});
  //     }).catch(e => {
  //       if (e.response.status === 404) {
  //         distSetAutentication(false);
  //         setUser({});
  //         removeToken();
  //         console.log("Ocurrio un error en las rutas, vuelva a logearse");
  //       } else {
  //       }
  //     });
  // }

  // useEffect(() => {
  //   seeMyRoutes();
  // }, []);

  return (

    <div className="flex h-screen overflow-hidden">
      <Router basename={process.env.REACT_APP_URL+'/dashadmin'}>
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
              <Route path='/restablecimientoContraseña' exact component={restablecimientoContraseña} />
              <Route path='/datosPersonales' exact component={TablaDatosPer} />
              <Route path='/cerrarSesion' exact component={CerrarSesion} />
              <Route path='/configuracion' exact component={Configuracion}/>
              <Route path='/calendarioEmpleados' exact component={calendarioEmpleados} />
              <Route path='/listaAdministradores' exact component={listaAdministradores} />
              {/* perfil */}
              <Route path='/calendarioPersonal' exact component={CalendarioPersonal} />
              
              <Route path='/calendarioAsistencia' exact component={calendarioAsistencia} />
              {/* calendario general */}
              {/* <Route path='/calendarioGeneral' exact component={calendarioGeneral} /> */}

            <Route path='/tablaEmpleados' exact component={administracionEmpleados} />

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
