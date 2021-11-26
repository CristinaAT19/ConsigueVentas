import React from 'react';
import AsistenciaMa from '../../components/AsistenciaMa';
import AsistenciaPer from '../../components/AsistenciaPer';
import AsistenciaTarde from '../../components/AsistenciaTarde';
// import { UserContext } from '../../components/context/UserContext';
import TablaDia from '../../components/TablaDia';
import TablaSin from '../../components/TablaSin';
const Dashboard = () => {

  // const {user} = useContext(UserContext);
  // console.log(user);

  return (
    <>
    <div style={{ height: '100%' }}>
      <div className="my-4" style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'space-evenly', marginbottom: '200px'}}>
          <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center" style={{ width: '35%' }}>
            <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1" >
              <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl" >Asistencia de Dia (Turno Mañana)</h1>
            </div>
            <div className="h-full py-4">
              <AsistenciaMa/>
            </div>

          </div>
          <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center" style={{ width: '35%' }}>
            <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1" >
              <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl" >Asistencia de Dia (Turno Tarde)</h1>
            </div>
            <div className="h-full py-4">
              <AsistenciaTarde/>
            </div>

          </div>
      </div >
      <div className="my-14" style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'space-evenly', marginbottom: '200px'}}>
        <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center" style={{ width: '35%' }}>
              <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1" >
                <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl" >Mi asistencia del mes</h1>
              </div>
              <div className="h-full py-4">
                <AsistenciaPer/>
              </div>

            </div>
        </div>
    </div>
    

      <div className="bg-gray-100 m-20 rounded-t-3xl text-center" >
        <h1 className="border-b-2 text-3xl">Tabla de Asistencia </h1>
        <TablaDia />
      </div>
      <div className="bg-yellow-50  h-full m-20 rounded-t-3xl text-center" >
        <h1 className="border-b-2 text-3xl">Vista de empleados sin marcar</h1>
        <TablaSin />
      </div>


    </>
  );
};

export default Dashboard;
