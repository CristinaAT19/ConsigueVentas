import * as FaIcons from "react-icons/fa";
import React, { useState } from "react";
import { setToken, getToken } from "../dist/Token";
import axios from "axios";
import Error from "../components/item/Error";

const TipoUsuario = (dniReset) => {
  const campo = document.getElementById("dni_reset");
  const { dni_reset } = dniReset;
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState('');
  const [tipoMostrar, setTipoMostrar] = useState('');
  const [error, setError] = useState([]);

  const seleccionarTipo = async (e) => {
    //reiniciar otros msjs de vista
    setValor("");
    setTipoMostrar("");
    //funcionalidad de seleccionarTipo
    setTipo(e.target.value);
  }

  const cambiarTipoUsuario = async (e) => {
    setValor("");
    setTipoMostrar("");
    setError([]);
    if (isNaN(dni_reset)) {
      const error = {
        "dni": "El dni debe ser un dato numerico",
      };
      setError(error);
      return;
    }

    if (dni_reset.length !== 8) {
      const error = {
        "dni": "El dni debe tener 8 numeros",
      };
      setError(error);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`

      }
    }

    const bodyParameters = {
      dni: dni_reset,
      tipoUsuario: tipo
    };

    await axios.post(`${process.env.REACT_APP_API_URL}/api/cambiarTipoUsuario`, bodyParameters, config)
      .then((Response) => {
        //setValor("Correcto");
        setValor(Response.data.msg[0].cambiar);

      })
      .catch((e) => {
        setValor("Ocurrio un error al cambiar");
        //setError(e.response.data.errors);
      });
  };

  const limpiar = () => {
    campo.value = '';
    setError([]);
    setValor("");
    setTipo("");
    setTipoMostrar("");
  };

  //////////////// MOSTRAR TIPO USUARIO ACTUAL
  const mostrarTipoUsuarioActual = async (e) => {

    setTipoMostrar("");
    setValor("");
    setError([]);
    if (isNaN(dni_reset)) {
      const error = {
        "dni": "El dni debe ser un dato numerico",
      };
      setError(error);
      return;
    }

    if (dni_reset.length !== 8) {
      const error = {
        "dni": "El dni debe tener 8 numeros",
      };
      setError(error);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }

    }

    const bodyParameters = {
      dni: dni_reset
    };

    await axios.post(`${process.env.REACT_APP_API_URL}/api/mostrarTipoUsuario`, bodyParameters, config)
      .then((Response) => {
        //console.log(Response);
        setTipoMostrar(Response.data.tipoUsuario);
        //console.log(tipoMostrar);
      })
      .catch((e) => {
        setTipoMostrar("Error al mostrar");
        //setError(e.response.data.errors);
      });
  };
  ///////////////////////////////////////////////
  return (
    <>
      <FaIcons.FaRegQuestionCircle onClick={mostrarTipoUsuarioActual} />
      <div className="flex items-center justify-start">
        <input type="radio" name="usu_adm" id="" value="1"
          checked={tipo == 1 ? true : false} onChange={seleccionarTipo} />
        <label>Administrador</label>
      </div>
      <div className="flex items-center justify-start">
        <input type="radio" name="usu_adm" id="" value="7"
          checked={tipo == 7 ? true : false} onChange={seleccionarTipo} />
        <label>Usuario</label>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-evenly m-1.5 gap-8">
        <button onClick={cambiarTipoUsuario} className="flex items-center justify-center w-56 bg-gray-700 text-gray-50 h-1/5 py-2 hover:bg-naranja rounded-md">
          Cambiar tipo de Usuario
        </button>
        <button onClick={limpiar} className="flex items-center justify-center w-56 md:w-28 bg-gray-700 text-gray-50 h-1/5 py-2 hover:bg-naranja rounded-md">
          Limpiar
        </button>
        <p> {valor} </p>
        <p> {tipoMostrar} </p>
        <Error errors={error['dni']} ></Error> <br />
      </div>
    </>
  );
};

export default TipoUsuario;

// despues de p {valor}-> <p> {tipo} </p>
