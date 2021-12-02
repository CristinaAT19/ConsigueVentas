import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TablaDatosPer = () => {
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        <section className="flex items-center justify-center w-full h-screen">
          <div className="flex flex-colgrid grid-cols-2 auto-cols-auto grid-rows-1 bg-gray-800 p-10 text-white gap-x-8 gap-y-4">
            <div className="grid grid-cols-2 auto-cols-auto grid-rows-1 m-px">
              <label>Nombres:</label>
              <input type="text" name="" id="" className="m-1.5" />

              <label>DNI:</label>
              <input type="text" name="" id="" className="m-1.5" />

              <label>Correo:</label>
              <input type="text" name="" id="" className="m-1.5" />

              <label>Area:</label>
              <input type="text" name="" id="" className="m-1.5" />
            </div>
            <div className="grid grid-cols-2 auto-cols-auto grid-rows-1 m-px">
              <label>Apellidos:</label>
              <input type="text" name="" id="" className="m-1.5" />

              <label>Teléfono:</label>
              <input type="text" name="" id="" className="m-1.5" />

              <label>Carrera:</label>
              <input type="text" name="" id="" className="m-1.5" />

              <label>Turno:</label>
              <input type="text" name="" id="" className="m-1.5" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TablaDatosPer;
