import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { getToken } from "../dist/Token";
import LoginSpinner from "./LoginSpinner";

const HomeContenido = ({ imagen, subTitulo , opcionSistema }) => {
  
  // opcionSistema 
  // 1 = Asistencia
  // 2 = Sistema ERP
  const Images = require.context("../images");
  const [redirect, setRedirect] = useState(false);
  const handleIngresar = (e) => {
    e.preventDefault();
    setRedirect(true);
  }
  if (redirect) {

    switch (opcionSistema) {
      case "1":
        return <Redirect to="/dashadmin/dashboard"/>
        break;
      case "2":
        if( process.env.REACT_APP_ENV == "local"){
          console.log("Local");
          // console.log(`http://localhost:${process.env.REACT_APP_PORT_LOCAL}/#/getToken/${getToken()}`);
          return <Redirect to="/dashadmin/dashboard"/>
 
          // return window.location.href=`http://localhost:${process.env.REACT_APP_PORT_LOCAL}/#/getToken/${getToken()}`;
        }else{
          return <Redirect to="/dashadmin/dashboard"/> 
          // console.log("Falta URL de produccion");
          // return window.location.href=`${process.env.REACT_APP_URL_SYSTEM_ERP}`;
        }
        break;
      default:
        return <Redirect to="/dashadmin/dashboard"/>
        break;
    }
  }
  return (
    <>
      <div className="subcontenido bg-white flex flex-col justify-center items-center p-8 rounded-2xl">
        <button onClick={handleIngresar} className="text-center flex flex-col justify-center items-center w-full h-full hover:no-underline">
          <img
            src={Images(`./${imagen}`).default}
            alt=""
            className="w-24 "
          />
          <h2 className="text-xl font-medium hover:text-naranja">
            {subTitulo}
          </h2>
        </button>
      </div>
    </>
  );
};

export default HomeContenido;
  