import React, { useState } from "react";
import { setToken, getToken } from "../dist/Token";
import axios from "axios";
import Error from "../components/item/Error";

const ResetearConstra = (dniReset) => {
    
    //console.log(dniReset);
    const campo=document.getElementById("dni_reset");
    console.log(campo);
    const {dni_reset}=dniReset;
    const [error, setError] = useState([]);
    const [valor, setValor] = useState("");
    const resetear = async (e) => {
     // e.preventDefault();
     setValor("");
     setError([]);

     if(isNaN(dni_reset)){
      const error = {
          "dni": "El dni debe ser un dato numerico",
      };
      setError(error);  
      return;
    }

     if(dni_reset.length !== 8){
      const error = {
          "dni": "El dni debe tener 8 numeros",
      };
      setError(error);
      return;
    }

    
      const config = {
        headers: { Authorization: `Bearer 1062|VzYr7PB1AHPBvSuVjaPpGC9rIinTVjxxe7cCVwgd` }
      }

      const bodyParameters = {
        dni: dni_reset
     };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/resetearPassword`, bodyParameters,config)
      .then((Response) => {
              //setValor("La contraseña ha sido reseteada");
              //console.log(Response);
              setValor(Response.data.msg[0].restablecer);
              //console.log(Response);
          })
          .catch((e) => {
            setValor("Ocurrio un error");
            console.log(e);
            //setError(e.response.data.errors);
          });
  };

  const limpiar = () => {
    setError([]);
    setValor("");
    campo.value='';
  };
    //////////////////////////////////////////

  return (
    <>
      <div className="flex items-center justify-evenly m-1.5 gap-8">
        
        <button onClick={resetear} className="flex items-center justify-center w-56 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Resetear contraseña
        </button>
        <button onClick={limpiar} className="flex items-center justify-center w-28 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Limpiar
        </button>
        <Error errors={error['dni']} ></Error> <br/>
        <p> {valor} </p> <br/>
        
      </div>
    </>
  );
};
export default ResetearConstra;