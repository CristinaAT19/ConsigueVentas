//import Reat, { useState, useContext } from "react";
import { distSetAutentication,distSetUser } from "../dist/Autentication";
import axios from "axios";
import { getToken, removeToken } from "../dist/Token";
//import { UserContext } from "./context/UserContext";


 const ControlInactividad = () => {
  console.log("CONTROL - INACTIVIDAD");
  
  //const { user } = useContext(UserContext);
  //const [dni, setDni] = useState(user['dni']);
  let msjToken='';
  //let token=getToken();
  let token=getToken();
  let idToken=token.split('|')[0];

   const peticionVerificacionToken = async () => {
   //await axios.get(`${process.env.REACT_APP_API_URL}/api/verificarToken/${token}`)
   await axios.get(`http://127.0.0.1:8000/api/verificarToken/${idToken}`)
      .then(response => {
        console.log(idToken);
          msjToken=response.data.tokenId;
          console.log(msjToken);
          console.log(idToken==msjToken);
      }).catch((e) => {
        msjToken='Error';
        console.log(msjToken);
      });
      //////////////
      if(idToken==msjToken){
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
};

export default ControlInactividad;