import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TablaDatosPer = () => {
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        <section className="flex items-center justify-center w-full h-screen">
          <div className="flex flex-wrap items-center justify-around w-5/12 bg-plomoIntermedio p-10 text-white">
            <div className="flex flex-row items-center justify-center mr-px">
              <label>Nombres</label>
              <input type="text" name="" id="" />
            </div>

            <div className="flex flex-row items-center justify-center mr-px">
              <label>Apellidos</label>
              <input type="text" name="" id="" />
            </div>

            <div>
              <label>DNI</label>
              <input type="text" name="" id="" />
            </div>

            <div>
              <label>Teléfono</label>
              <input type="text" name="" id="" />
            </div>

            <div>
              <label>Correo</label>
              <input type="text" name="" id="" />
            </div>

            <div>
              <label>Carrera</label>
              <input type="text" name="" id="" />
            </div>

            <div>
              <label>Area</label>
              <input type="text" name="" id="" />
            </div>

            <div>
              <label>Turno</label>
              <input type="text" name="" id="" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TablaDatosPer;
