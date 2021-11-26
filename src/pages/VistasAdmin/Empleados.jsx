import React from 'react';
import RestablecerPassword from '../../components/RestablecerPassword';
//import RestablecerPassword from '../../components/RestablecerPassword';
import TablaAdmin from '../../components/TablaAdmin';
import TablaEmpleados from '../../components/TablaEmpleados';
import TablaFaltas from '../../components/TablaFaltas';

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
        <TablaEmpleados />
      </div>
    </>
  );
};

export const restablecimientoContraseña = () => {
  return (
    <div>
        <h1>vista restablecimiento Contraseña</h1>
        <RestablecerPassword />
    </div>
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
     <h1>vista calendarioEmpleados</h1>
    </div>
  );
};

export const listaAdministradores = () => {
  return (
    <div>
      <TablaAdmin/>
      
    </div>
  );
};
