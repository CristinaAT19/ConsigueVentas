
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";




const TablaDatosPer = () => {

  const { user } = useContext(UserContext);
  
  return (
    <> 
  {/* <div className="text-blueGray-400 text-2xl font-bold mt-4 uppercase text-center">
    <h2 className="py-4">Datos Personales</h2>
  </div> */}

{user["id_TipoUsuario"] == 2 || user["id_TipoUsuario"] == 1 ? (
  <section clasName="">
    <div className="w-4/5 mx-auto mt-14">
      <div className="text-gray-50 bg-gray-700 text-2xl font-bold uppercase text-center">
        <h2 className="py-4" style={{ color: "white"}}>Datos Personales</h2>
      </div>
      <div className="py-4 rounded-b-2xl shadow-md bg-white">            
            <div className="flex flex-wrap justify-center">
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2">
                    Nombres
                  </label>
                  <input type="text" disabled className="border px-3 py-3 bg-gray-50 rounded text-sm shadow-md" value={user['nombre']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2">
                    Apellidos
                  </label>
                  <input type="text" disabled  className="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" value={user['apellido']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2">
                    Dni
                  </label>
                  <input type="text" disabled className="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" value={user['dni']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2">
                    Carrera
                  </label>
                  <input type="text" disabled className="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" value={user['perfil']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2">
                    Departamento
                  </label>
                  <input type="text" disabled className="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" value={user['unidad']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-xs font-bold mb-2">
                    Turno
                  </label>
                  <input type="text" disabled className="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" value={user['turno']}/>
                </div>
              </div>
            </div>
      </div>
    </div>
  </section>
  ) : null}
</>
  );
};

export default TablaDatosPer;