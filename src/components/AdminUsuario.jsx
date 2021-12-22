import React, { useState, useRef } from "react";
import ResetearConstra from "./ResetearConstra";
import TipoUsuario from "./TipoUsuario";

const AdminUsuario = ({
  titulo,
  descripcion1,
  descripcion2,
  descripcion3,
  texto,
  texto2,
  tipoUsuario,
}) => {
  const [resetea, setResetea] = useState(false);
  const [valorDni, setValorDni] = useState("");
  const onChangeDni = (evento) => {
    setValorDni(evento.target.value);
    //console.log(componenteInput.current.value);
  };

  return (
    <>
      <div className="flex flex-col items-baseline justify-start w-full p-2 md:p-10 pt-2 bg-white rounded">
        <div className="flex flex-col items-baseline justify-start m-1.5">
          <h3>{titulo}</h3>
          <p>{descripcion1}</p>
          <p>{descripcion2}</p>
          <p>{descripcion3}</p>
        </div>
        <div className="flex flex-col md:flex-row items-baseline justify-center m-1.5">
          <label className="pr-3">{texto}</label>
          <input
            onChange={onChangeDni}
            className="border pl-2 py-2 bg-gray-50 rounded text-sm shadow-md text-black"
            type="number"
            placeholder="DNI"
            name="dni_reset"
            id="dni_reset"
          />
        </div>
        <div className="flex w-full flex-col items-baseline justify-center gap-2 m-1.5">
          <label>{texto2}</label>
          {tipoUsuario ? (
            <TipoUsuario dni_reset={valorDni} />
          ) : (
            <ResetearConstra dni_reset={valorDni} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsuario;
// <span>{valorDni}</span><br/> (antes del checkbox)
