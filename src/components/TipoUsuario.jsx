import * as FaIcons from "react-icons/fa";
import React, { useState } from "react";
import { setToken, getToken } from "../dist/Token";
import axios from "axios";
import Error from "../components/item/Error";
import TablaAdmin from "./TablaAdmin";
const TipoUsuario = (dniReset) => {
  let [cambio, setCambio] = useState(false);
  const campo = document.getElementById("dni_reset");
  const { dni_reset } = dniReset;
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipoMostrar, setTipoMostrar] = useState("");
  const [error, setError] = useState([]);
  //////
  const seleccionarTipo = async (e) => {
    //reiniciar otros msjs de vista
    setValor("");
    setTipoMostrar("");
    //funcionalidad de seleccionarTipo
    setTipo(e.target.value);
  };

  const cambiarTipoUsuario = async (e) => {
    setValor("");
    setTipoMostrar("");
    setError([]);
    if (isNaN(dni_reset)) {
      const error = {
        dni: "El dni debe ser un dato numerico",
      };
      setError(error);
      return;
    }

    if (dni_reset.length !== 8) {
      const error = {
        dni: "El dni debe tener 8 numeros",
      };
      setError(error);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const bodyParameters = {
      dni: dni_reset,
      tipoUsuario: tipo,
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/cambiarTipoUsuario`,
        bodyParameters,
        config
      )
      .then((Response) => {
        //setValor("Correcto");
        setValor(Response.data.msg[0].cambiar);
        setCambio(!cambio);
        console.log(cambio);
      })
      .catch((e) => {
        setValor("Ocurrio un error al cambiar");
        //setError(e.response.data.errors);
      });
  };

  const limpiar = () => {
    campo.value = "";
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
        dni: "El dni debe ser un dato numerico",
      };
      setError(error);
      return;
    }

    if (dni_reset.length !== 8) {
      const error = {
        dni: "El dni debe tener 8 numeros",
      };
      setError(error);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const bodyParameters = {
      dni: dni_reset,
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/mostrarTipoUsuario`,
        bodyParameters,
        config
      )
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
      <div className="flex w-full flex-row justify-start gap-2 place-content-start">
        <div>
          <input
            type="radio"
            name="usu_adm"
            id=""
            value="1"
            checked={tipo == 1 ? true : false}
            onChange={seleccionarTipo}
          />
          <label className="ml-1">Administrador</label>
        </div>
        <div>
          <input
            type="radio"
            name="usu_adm"
            id=""
            value="2"
            checked={tipo == 2 ? true : false}
            onChange={seleccionarTipo}
          />
          <label className="ml-1">Usuario</label>
        </div>
        <FaIcons.FaRegQuestionCircle onClick={mostrarTipoUsuarioActual} />
      </div>

      <div className="flex flex-wrap items-center justify-evenly m-1.5 gap-8">
        <button
          onClick={cambiarTipoUsuario}
          className="flex items-center justify-center w-56 bg-gray-700 text-gray-50 h-1/5 py-2 hover:bg-naranja rounded-md"
        >
          Cambiar tipo de Usuario
        </button>
        <button
          onClick={limpiar}
          className="flex items-center justify-center w-56 md:w-28 bg-gray-700 text-gray-50 h-1/5 py-2 hover:bg-naranja rounded-md"
        >
          Limpiar
        </button>
      </div>
      <div>
        <p> {valor} </p>
        <p> {tipoMostrar} </p>
        <Error errors={error["dni"]}></Error> <br />
      </div>
      <div className="m-auto w-full">
        <TablaAdmin cambio={cambio} />
      </div>
    </>
  );
};

export default TipoUsuario;
// despues de p {valor}-> <p> {tipo} </p>
