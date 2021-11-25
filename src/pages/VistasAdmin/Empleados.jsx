import React from 'react';
import TablaAdmin from '../../components/TablaAdmin';
import App from '../../components/TablaEmpleados';
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
        <App />
      </div>
    </>
  );
};

export const restablecimientoContraseña = () => {
  return (
    <div>
        <h1>vista restablecimientoContraseña</h1>
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
