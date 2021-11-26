import React, { useState } from "react";
import { setToken, getToken } from "../dist/Token";
import axios from "axios";

const ResetearConstra = (dni_reset) => {
    /*const paramsRequest = {
    }*/

    const [valor, setValor] = useState("DEFECTO");
    //const [error, setError] = useState([]);
    ///////////////////////////////////////////
    const resetear = async (e) => {
     // e.preventDefault();
      // "dni": "76634714",
     /* if(dni_reset !== 8){
          const error = {
              "dni": "El dni debe tener 8 numeros",
          };
          setError(error);
          return;
      }

      if(isNaN(dni_reset.value)){
          const error = {
              "dni": "El dni debe ser un dato numerico",
          };
          setError(error); 
          return;
      }*/

      const config = {
        headers: { Authorization: `Bearer 702|4xA7bNitJVLfowQZxZQUBajHtUAIAwV8KV2gaNJT` }
      };
      //paramsRequest['dni'] = e.target.elements.dni_reset.value;
      /*const paramsRequest={
        'dni': dni_reset
      };*/
      const bodyParameters = {
        dni: dni_reset
     };

      await axios.post(`https://desarrollo.consigueventas.com/Backend/public/api/resetearPassword`, bodyParameters,config)
          .then((Response) => {
              setValor("CORRECTO");
             // setError([]);
          })
          .catch((e) => {
            setValor("Error");
            //setError(e.response.data.errors);
          });
  };
    //////////////////////////////////////////

  return (
    <>
      <div className="flex items-center justify-evenly m-1.5 gap-8">
        <button onClick={resetear} className="flex items-center justify-center w-56 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Resetear contraseña
        </button>
        <button className="flex items-center justify-center w-28 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Limpiar
        </button>
        <span> {valor} </span>
      </div>
    </>
  );
};
export default ResetearConstra;

/*
await axios.post(`https://desarrollo.consigueventas.com/Backend/public/api/resetearPassword`, paramsRequest,
          { 
              //'Authorization': `Bearer ${getToken}`,
              'Authorization': `Bearer 702|4xA7bNitJVLfowQZxZQUBajHtUAIAwV8KV2gaNJT`,
              'Content-Type': 'application/json',
              'Accept': 'application/json' 
          })
          .then((Response) => {
              setValor("CORRECTO");
             // setError([]);
          })
          .catch((e) => {
            setValor("Error");
            //setError(e.response.data.errors);
          });
/////////// */