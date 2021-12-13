//import Reat, { useState, useContext } from "react";
import { distSetAutentication,distSetUser } from "../dist/Autentication";
import axios from "axios";
import { getToken, removeToken } from "../dist/Token";
//import { UserContext } from "./context/UserContext";


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
     } else {
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