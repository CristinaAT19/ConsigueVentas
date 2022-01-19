import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import HomeContenido from "../components/HomeContenido";
import { Link } from 'react-router-dom';
// import Verificacion from "../images/listaVerificacion.png";
// import Erp from "../images/erp.png";

const Home = () => {

  return (
    <>
      <section className="w-full h-screen bg-naranja flex flex-col items-center">
        <div className="header bg-white w-full flex flex-col items-center">
          <div className="w-11/12 flex justify-between items-center py-3">
            <img
              src="https://desarrollo.consigueventas.com/Frontend/Recursos/Logo.svg"
              alt=""
              className="w-36"
            />

            <Link
              className="font-medium no-underline hover:no-underline hover:text-naranja text-negro text-xl"
              to="dashadmin/cerrarSesion"
            >
              Cerrar Sesión
            </Link>
          </div>
        </div>

        <div className="contenido flex flex-col justify-center items-center w-full">
          <h1 className="title py-20 text-4xl font-semibold">
            ¿A DONDE QUIERES IR?
          </h1>
          <div className="items flex justify-around items-center w-8/12">
            <HomeContenido
              imagen="listaVerificacion.png"
              subTitulo="Asistencia"
              opcionSistema="1"
            />
            {/* <HomeContenido imagen="erp.png" subTitulo="Sistema ERP" opcionSistema="2" /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
