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
      <div>
        <App />
      </div>
    </>
  );
};

export const restablecimientoContraseña = () => {
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-center m-2">Administración de Usuarios</h1>
        <section className="flex items-center justify-center w-full h-full text-white">
          <AdminUsuario
            titulo="Sección para reseteo y cambio de tipo de usuario"
            descripcion1="- Puedes resetear el ingreso al sistema ingresando el Nº de dni del empleado (La contraseña que quedará por defecto es el dni)."
            descripcion2="- Si marcas el check puedes cambiar el tipo de usuario del empleado (Administrador / Usuario)."
            descripcion3="- Si das click al signo de interrogación (?) , puedes saber el tipo de usuario actual del empleado ."
            texto="DNI del empleado"
            texto2="Sólo resetear contraseña"
          />
        </section>
      </div>
    </>
  );
};

export const tablaFaltas = () => {
  return (
    <div>
      <TablaFaltas />
    </div>
  );
};

export const calendarioEmpleados = () => {
  return (
    <div>
      <h1>
      VISTA CALENDARIO EMPLEADOS
      </h1>
      
      <CalendarioEmpleados/>
    </div>
  );
};

export const listaAdministradores = () => {
  return (
    <div>
      <TablaAdmin />
    </div>
  );
};
