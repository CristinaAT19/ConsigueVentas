import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TablaDatosPer = () => {
  return (
    <>
      <div className="flex-col items-center justify-center">
        <section className="flex items-center justify-center w-full h-screen">
          <div className="flex flex-wrap items-center justify-around w-5/12 h-2/4 bg-plomoIntermedio p-10 text-white">
            <label>Nombres</label>
            <input type="text" name="" id="" />

            <label>Apellidos</label>
            <input type="text" name="" id="" />

            <label>DNI</label>
            <input type="text" name="" id="" />

            <label>Teléfono</label>
            <input type="text" name="" id="" />

            <label>Correo</label>
            <input type="text" name="" id="" />

            <label>Carrera</label>
            <input type="text" name="" id="" />

            <label>Area</label>
            <input type="text" name="" id="" />

            <label>Turno</label>
            <input type="text" name="" id="" />
          </div>
        </section>
      </div>
    </>
  );
};

export default TablaDatosPer;
