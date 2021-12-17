//import Reat, { useState, useContext } from "react";
import { distSetAutentication,distSetUser } from "../dist/Autentication";
import axios from "axios";
import { getToken, removeToken } from "../dist/Token";
import CerrarSesion from "./CerrarSesion";
import { useState } from "react";
// import { UserContext } from "./context/UserContext";

 const ControlInactividad = () => {
    //const { user } = useContext(UserContext);
  //const [dni, setDni] = useState(user['dni']);
  let msjToken='';
  //let token=getToken();
  let token=getToken();
  let idToken=token.split('|')[0];
   const peticionVerificacionToken = async () => {
   //await axios.get(`${process.env.REACT_APP_API_URL}/api/verificarToken/${token}`)
   await axios.get(`${process.env.REACT_APP_API_URL}/api/verificarToken/${idToken}`)
      .then(response => {
          msjToken=response.data.tokenId;
      }).catch((e) => {
        msjToken='Error';
      });
      //////////////
      if(idToken==msjToken){
        console.log(window.location.href);
        console.log(window.location.pathname);
        // return true;
     } else {
       removeToken();
       distSetAutentication(false); 
      //  return false;
      // <Redirect to='/login'/>;
      let route = window.location;
      route['hash'] = '#/cerrarSesion';      
      // window.location = '/#/cerrarSesion';  
    }
      ///////////////
  }
  peticionVerificacionToken();
};

export default ControlInactividad;