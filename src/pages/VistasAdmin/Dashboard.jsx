import React from 'react';
import AsistenciaMa from '../../components/AsistenciaMa';
import AsistenciaPer from '../../components/AsistenciaPer';
import AsistenciaTarde from '../../components/AsistenciaTarde';
import TablaDia from '../../components/TablaDia';
import TablaSin from '../../components/TablaSin';
const Dashboard = () => {
  return (
    <>
    <div style={{ height: '100%' }}>
      <div className="my-4" style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'space-evenly', marginbottom: '200px'}}>
          <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center" style={{ width: '35%' }}>
            <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1" >
              <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl" >Mañana</h1>
            </div>
            <div className="h-full py-4">
              <AsistenciaMa/>
            </div>

          </div>
          <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center" style={{ width: '35%' }}>
            <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1" >
              <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl" >Tarde</h1>
            </div>
            <div className="h-full py-4">
              <AsistenciaTarde/>
            </div>

          </div>
      </div >
      <div className="Dashboard-Personal" style={{ width: '100%', height: '320px' }}>
          <h1 style={{ textAlign: 'center' }}>Personal</h1>
          <AsistenciaPer/>
      </div>
    </div>
    

      <div className="bg-gray-300 m-20" >
        <TablaDia />
      </div>
      <div className="bg-gray-300 m-20" >
        <TablaSin />
      </div>


    </>
  );
};

export default Dashboard;
