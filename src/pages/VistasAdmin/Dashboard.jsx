import React, { useContext } from "react";
import AsistenciaMa from "../../components/AsistenciaMa";
import AsistenciaMaTa from "../../components/AsistenciaMaTa";
import AsistenciaPer from "../../components/AsistenciaPer";
import AsistenciaTarde from "../../components/AsistenciaTarde";
import { UserContext } from "../../components/context/UserContext";
// import { UserContext } from '../../components/context/UserContext';
import TablaDia from "../../components/TablaDia";
import TablaSin from "../../components/TablaSin";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const hoy = new Date();
  var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  return (
    <>
      <WelcomeBanner />
      <h1 className="text-center text-3xl">Dashboard</h1>
      {user["id_TipoUsuario"] == 2 || user["id_TipoUsuario"] == 1 ? (
      <div>
        <div className="my-4">
          <h1 className=" mt-2 text-center text-3xl">Dashboard personal</h1>
          <div className="border-gray-500 w-full flex justify-evenly my-2" style={{ height: '700px' }} >
            <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center w-4/5">
              <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1">
                <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl">
                  Mi asistencia del mes
                </h1>
              </div>
              <div className="h-full py-4">
                <AsistenciaPer />
              </div>
            </div>
          </div>
        </div>
        {/* Dashboards de administrador */}
        {user["id_TipoUsuario"] == 1 ? (
          <div className="my-4">
            <h1 className="text-center text-3xl">Dashboard de Administrador</h1>

            <div className="bg-white rounded-t-3xl text-center mb-4 mx-4">

              <div className="mt-2 w-full flex flex-row  justify-evenly mb-4 h-96" >
                <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center w-2/5">
                  <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1">
                    <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl">
                      Asistencia del Dia (Turno Mañana)
                    </h1>
                  </div>
                  <div className="h-full py-4">
                    <AsistenciaMa />
                  </div>
                </div>

                <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center w-2/5">
                  <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1">
                    <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl">
                      Asistencia del Dia (Turno Tarde)
                    </h1>
                  </div>
                  <div className="h-full py-4">
                    <AsistenciaTarde />
                  </div>
                </div>
              </div>



              <div className="my-14 w-full flex justify-evenly mb-4 h-96">
                <div className="bg-white border-transparent rounded-lg shadow-xl flex flex-col justify-center w-2/5">
                  <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-1">
                    <h1 className="font-bold uppercase text-gray-600 w-full text-center text-xl">
                      Asistencia del Dia (Mañana y Tarde)
                    </h1>
                  </div>
                  <div className="h-full py-4">
                    <AsistenciaMaTa />
                  </div>
                </div>
              </div>

            </div>

          </div>

        ) : null}


        {/* Tablas de administrador */}
        {user["id_TipoUsuario"] == 1 ? (
          <div className="bg-white rounded-t-3xl text-center mb-4 mx-4">
            <h1 className="border-b-2 text-3xl">Tabla de Asistencias: {fecha} </h1>
            <div className="my-0 mx-auto py-4" style={{ width: "97%" }}>
              <TablaDia />
            </div>
          </div>
        ) : null}

        {user["id_TipoUsuario"] == 1 ? (
          <div className="bg-white rounded-t-3xl text-center mb-4 mx-4">
            <h1 className="border-b-2 text-3xl">Tabla de empleados sin marcar: {fecha} </h1>
            <div className="my-0 mx-auto py-4" style={{ width: "97%", minWidth: "1028px" }}>
              <TablaSin />
            </div>
          </div>
        ) : null}
      </div>
      ) : null}
    </>
  );
};

export default Dashboard;
