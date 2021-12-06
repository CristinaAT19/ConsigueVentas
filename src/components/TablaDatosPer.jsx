
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";




const TablaDatosPer = () => {

  const { user } = useContext(UserContext);
  
  return (
    <> 
  <div className="text-blueGray-400 text-2xl font-bold mt-4 uppercase text-center">
    <h2 className="py-4">Datos Personales</h2>
  </div>
  <section clasName="">
    <div className="w-4/5 mx-auto">
        <form className="border py-4 border-yellow-500 shadow-md bg-indigo-100">            
            <div className="flex flex-wrap justify-center">
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Nombres
                  </label>
                  <input type="text" disabled className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value={user['nombre']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Apellidos
                  </label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value={user['apellido']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Dni
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value={user['dni']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Carrera
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value={user['perfil']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Unidad
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value={user['unidad']}/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Turbo
                  </label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value={user['turno']}/>
                </div>
              </div>
            </div>
        </form>
    </div>
  </section>
</>
  );
};

export default TablaDatosPer;