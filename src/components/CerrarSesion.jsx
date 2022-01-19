import axios from "axios";
import { useContext } from "react";
import { distSetAutentication } from "../dist/Autentication";
import { getToken, removeToken } from "../dist/Token";
import { UserContext } from "./context/UserContext";


const CerrarSesion= ()=>{

    const peticionCerrarSesion = async ()=>{
        await axios.post(`${process.env.REACT_APP_API_URL}/api/cerrarsesion}`,
        {
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      )
        .then(response => {
  
        }).catch(error => {
      });
  
    }
    const {user,setUser}=  useContext(UserContext);
    const cerrarSesion = ()=>{
        peticionCerrarSesion();
        distSetAutentication(false);
        setUser({});
        removeToken();

        


    }
    cerrarSesion();
    return (<div>Cerrando sesión</div>);
}

export default CerrarSesion;