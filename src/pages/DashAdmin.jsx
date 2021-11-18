import React from 'react'
import '../styles/DashAdmin.css';
import Sidebar from '../components/lib/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  administracionEmpleados,
  restablecimientoContraseña,
  tablaFaltas,
  calendarioEmpleados,
  listaAdministradores
} from './VistasAdmin/Empleados'
import { calendarioAsistencia,datosPersonales } from './VistasAdmin/Perfil';
import calendarioGeneral from './VistasAdmin/CalendarioGeneral';
import Dashboard from './VistasAdmin/Dashboard';
import { configuracion } from './VistasAdmin/Configuracion';
const DashAdmin = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/dashboard' exact component={Dashboard} />
          {/* empleados */}
          <Route path='/administracionEmpleados' exact component={administracionEmpleados} />
          <Route path='/restablecimientoContraseña' exact component={restablecimientoContraseña} />
          <Route path='/tablaFaltas' exact component={tablaFaltas} />
          <Route path='/calendarioEmpleados' exact component={calendarioEmpleados} />
          <Route path='/listaAdministradores' exact component={listaAdministradores} />
          {/* perfil */}
          <Route path='/calendarioAsistencia' exact component={calendarioAsistencia} />
          <Route path='/datosPersonales' exact component={datosPersonales} />
          {/* calendario general */}
          <Route path='/calendarioGeneral' exact component={calendarioGeneral} />
          {/* Configuración */}
          <Route path='/configuracion' exact component={configuracion} />
        </Switch>
      </Router>
    </>

  );
};

export default DashAdmin;
