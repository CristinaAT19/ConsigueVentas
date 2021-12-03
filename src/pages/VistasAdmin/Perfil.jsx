import React from 'react';
import CalendarioPersonal from '../../components/CalendarioPersonal';
import TablaDatosPer from '../../components/TablaDatosPer';

export const calendarioAsistencia = () => {
  return (
    <>
      <div>
        <h1>Vista calendarioAsistencia</h1>
          <CalendarioPersonal />
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