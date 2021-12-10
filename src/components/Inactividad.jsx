import Reat, { useState, useContext } from "react";
import { distSetAutentication,distSetUser } from "../dist/Autentication";
import axios from "axios";
import { removeToken } from "../dist/Token";
import { UserContext } from "./context/UserContext";


 const ControlInactividad = () => {
  console.log("CONTROL - INACTIVIDAD");
  const { user } = useContext(UserContext);
  const [dni, setDni] = useState(user['dni']);
  let msjDni='';

   const peticionVerificacionToken = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/verificarToken/${dni}`)
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
  return (<div>Tiempo expirado</div>);
};

export default ControlInactividad;