import * as FaIcons from "react-icons/fa";
import React, { useState } from "react";
import { setToken, getToken } from "../dist/Token";
import axios from "axios";

const TipoUsuario = (dniReset) => {
  const campo=document.getElementById("dni_reset");
  const {dni_reset}=dniReset;
  console.log(dni_reset);
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState('');
  const [tipoMostrar, setTipoMostrar] = useState('');

  const seleccionarTipo = async(e) =>{
    //reiniciar otros msjs de vista
    setValor("");
    setTipoMostrar("");
    //funcionalidad de seleccionarTipo
    setTipo(e.target.value);
  }
  const cambiarTipoUsuario = async (e) => {
      setValor("");
      setTipoMostrar("");
      const config = {
       headers: { Authorization: `Bearer 1062|VzYr7PB1AHPBvSuVjaPpGC9rIinTVjxxe7cCVwgd` }
      }

      const bodyParameters = {
       dni: dni_reset,
       tipoUsuario: tipo
    };

     await axios.post(`${process.env.REACT_APP_API_URL}/api/cambiarTipoUsuario`, bodyParameters,config)
     .then((Response) => {
             //setValor("Correcto");
             setValor(Response.data.msg[0].cambiar);
             console.log(Response);
         })
         .catch((e) => {
           setValor("Ocurrio un error al cambiar");
           console.log(e);
           //setError(e.response.data.errors);
         });
 };

 const limpiar = () => {
  campo.value='';
  setValor("");
  setTipoMostrar("");
 };
 
 //////////////// MOSTRAR TIPO USUARIO ACTUAL
 const mostrarTipoUsuarioActual = async (e) => {
  setTipoMostrar("");
  setValor("");
  const config = {
   headers: { Authorization: `Bearer 1058|M3cAikJUGTb6r5LbmU5Dg3C2XNWFUrXmoV0Pq2s7` }
  }

  const bodyParameters = {
   dni: dni_reset
  };

 await axios.post(`${process.env.REACT_APP_API_URL}/api/mostrarTipoUsuario`, bodyParameters,config)
 .then((Response) => {
         //console.log(Response);
         setTipoMostrar(Response.data.tipoUsuario);
         //console.log(tipoMostrar);
     })
     .catch((e) => {
      setTipoMostrar("Error al mostrar");
       console.log(e);
       //setError(e.response.data.errors);
     }); 
};
 ///////////////////////////////////////////////
  return (
    <>
      <FaIcons.FaRegQuestionCircle onClick={mostrarTipoUsuarioActual}/>
      <div className="flex items-center justify-start">
        <input type="radio" name="usu_adm" id="" value="1" 
        checked={tipo == 1 ? true : false} onChange={seleccionarTipo}/>
        <label>Administrador</label>
      </div>
      <div className="flex items-center justify-start">
        <input type="radio" name="usu_adm" id="" value="2" 
        checked={tipo == 2 ? true : false} onChange={seleccionarTipo}/>
        <label>Usuario</label>
      </div>

      <div className="flex items-center justify-evenly m-1.5 gap-8">
        <button onClick={cambiarTipoUsuario} className="flex items-center justify-center w-56 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Cambiar tipo de Usuario
        </button>
        <button onClick={limpiar} className="flex items-center justify-center w-28 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Limpiar
        </button>
        <p> {valor} </p>
        <p> {tipoMostrar} </p>
      </div>
    </>
  );
};

export default TipoUsuario;

// despues de p {valor}-> <p> {tipo} </p>
