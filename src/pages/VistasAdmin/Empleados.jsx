import React from "react";
import AdminUsuario from "../../components/AdminUsuario";
import CalendarioPersonal from "../../components/CalendarioPersonal";
import CalendarioEmpleados from "../../components/CalendarioEmpleados";
import TablaAdmin from "../../components/TablaAdmin";
import TablaEmpleados from "../../components/TablaEmpleados";
import TablaFaltas from "../../components/TablaFaltas";
import App from "../../App";


// export const Reports = () => {
//   return (
//     <div className='reports'>
//       <h1>Reports</h1>
//     </div>
//   );
// };

export const administracionEmpleados = () => {
  return (
    <>
      <div className="bg-white rounded-t-3xl text-center" style={{margin: '1rem 1rem'}}>
        <h1 className="border-b-2 text-3xl">Administracion de Empleados</h1>
        <div className="my-0 mx-auto py-4" style={{ width: '97%'}}>
          <TablaEmpleados/>
        </div>
      </div>
    </>
  );
};

export const restablecimientoContraseña = () => {
  return (
    <>
      <div className="w-4/5 mx-auto mt-14">
        <div className="text-gray-50 bg-gray-700 text-2xl font-bold uppercase text-center">
          <h2 className="py-4">Administración de Usuarios</h2>
        </div>
        <section className="rounded-b-2xl shadow-md bg-white">
          <AdminUsuario
            titulo="Sección para reseteo y cambio de tipo de usuario"
            descripcion1="- Puedes resetear el ingreso al sistema ingresando el Nº de DNI del empleado (La contraseña que quedará por defecto es el DNI)."
            descripcion2="- Si marcas el check puedes cambiar el tipo de usuario del empleado (Administrador / Usuario)."
            descripcion3="- Si das click al signo de interrogación (?), puedes saber el tipo de usuario actual del empleado."
            texto="DNI del empleado"
            texto2="Solo resetear contraseña"
          />
        </section>
      </div>
    </>
  );
};

export const tablaFaltas = () => {
  return (
    <div className="bg-white rounded-t-3xl text-center" style={{margin: '1rem 1rem'}}>
        <h1 className="border-b-2 text-3xl">Administración de faltas</h1>
        <div className="my-0 mx-auto py-4" style={{ width: '97%'}}>
        <TablaFaltas />
        </div>
      </div>
  );
};

export const calendarioEmpleados = () => {
  return (
    <div className="bg-white rounded-t-3xl text-center" style={{margin: '1rem 1rem'}}>
    <h1 className="border-b-2 text-3xl"> Vista Calendario de Empleados</h1>
    <div className="my-0 mx-auto py-4" style={{ width: '97%'}}>
    <CalendarioEmpleados/>
    </div>
  </div>

  );
};

export const listaAdministradores = () => {
  return (
  <div className="bg-white rounded-t-3xl text-center" style={{margin: '1rem 1rem'}}>
    <h1 className="border-b-2 text-3xl"> Mi Calendario de Asistencia</h1>
    <div className="my-0 mx-auto py-4" style={{ width: '97%'}}>
    <TablaAdmin />
    </div>
  </div>


  );
};
