import React,{ useContext } from 'react';
import CalendarioPersonal from '../../components/CalendarioPersonal';
import CalendarioPersonalMovil from '../../components/CalendarioPersonalMovil';
import TablaDatosPer from '../../components/TablaDatosPer';
import { UserContext } from "../../components/context/UserContext";
export const CalendarioAsistencia = () => {

  const { user } = useContext(UserContext);
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return (
      <>
   {user["id_TipoUsuario"] == 2 || user["id_TipoUsuario"] == 1 ? (
    <div className="bg-white rounded-t-3xl text-center" style={{margin: '1rem 1rem'}}>
        <h1 className="border-b-2 text-3xl"> Mi Calendario de Asistencia</h1>
        <div className="my-0 mx-auto py-4" style={{ width: '97%'}}>
          
        <CalendarioPersonal style={{ fontsize: '1.0em' !important  }} />
        </div>
      </div>
    ) : null}
      </>
    );
  }
  else{
    return (
      <>
   {user["id_TipoUsuario"] == 2 || user["id_TipoUsuario"] == 1 ? (
    <div className="bg-white rounded-t-3xl text-center" style={{margin: '1rem 1rem'}}>
        <h1 className="border-b-2 text-3xl"> Mi Calendario de Asistencia</h1>
        <div className="my-0 mx-auto py-4" style={{ width: '97%'}}>
          
        <CalendarioPersonalMovil />
        </div>
      </div>
    ) : null}
      </>
    );
  }
  
  
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