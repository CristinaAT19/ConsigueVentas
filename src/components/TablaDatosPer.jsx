
import React, { useState, useEffect } from "react";


const TablaDatosPer = () => {
  return (
    <> 
  <div className="text-blueGray-400 text-2xl font-bold mt-4 uppercase text-center">
    <h2 className="py-4">Datos Personales</h2>
  </div>
  <section>
    <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">         
      <div className="px-4 lg:px-10 py-10 pt-0">
        <form className=" p-4 border-2 border-yellow-500">            
            <div className="flex flex-wrap justify-center mt-28">
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Nombres
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="tu nombre"/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Apellidos
                  </label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="apellido"/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Dni
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="dni"/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Correo
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="correo"/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Telefono
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="telefono"/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Carrera
                  </label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="correo"/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Turno
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="turno"/>
                </div>
              </div>
              <div className="px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Area
                  </label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-md focus:ring-yellow-500" value="area"/>
                </div>
              </div>
            </div>
        </form>
      </div>
    </div>
  </section>
</>
  );
};

export default TablaDatosPer;