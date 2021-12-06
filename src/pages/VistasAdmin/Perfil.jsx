import React from 'react';
import CalendarioPersonal from '../../components/CalendarioPersonal';
import TablaDatosPer from '../../components/TablaDatosPer';

export const calendarioAsistencia = () => {
  return (
    <>

  <div className="bg-white rounded-t-3xl text-center" style={{margin: '1rem 1rem'}}>
      <h1 className="border-b-2 text-3xl"> Mi Calendario de Asistencia</h1>
      <div className="my-0 mx-auto py-4" style={{ width: '97%'}}>
      <CalendarioPersonal />
      </div>
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