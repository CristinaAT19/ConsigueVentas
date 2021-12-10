import { getToken } from "../dist/Token";
import React, { useState, useEffect } from "react";
//import { Redirect } from "react-router";
import { distSetAutentication,distSetUser } from "../dist/Autentication";
import axios from "axios";
import { removeToken } from "../dist/Token";

export const ControlInactividad = () => {
  console.log("CONTROL - INACTIVIDAD");
  const dni='70045021';
  let msjDni='';

  const peticionVerificacionToken = async () => {
    await axios.get(`http://127.0.0.1:8000/api/verificarToken/${dni}`)
      .then(response => {
          msjDni=response.data.tokenDni;
          console.log(msjDni);
          console.log(dni==msjDni);
      }).catch((e) => {
        msjDni='Error';
        console.log(msjDni);
      });
      //////////////
      if(dni==msjDni){
        console.log("Token aun activo");
     } else {
       console.log("Token inactivo");
       console.log("Redirigiendo");
       removeToken();
       distSetAutentication(false);
      // <Redirect to='/login'/>;
        window.location = '/login';  
    }
      ///////////////
  }
  peticionVerificacionToken();
}