import React from 'react';
import CalendarioPersonal from '../../components/CalendarioPersonal';
import TablaDatosPer from '../../components/TablaDatosPer';
export const calendarioAsistencia = () => {
  return (
    <>
      <div>
        <CalendarioPersonal/>
      </div>
    </>
  );
};

export const datosPersonales = () => {
  return (
    <>
      <div>
        <TablaDatosPer/>
      </div>
    </>
  );
};
