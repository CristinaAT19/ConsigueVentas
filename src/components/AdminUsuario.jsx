import React, { useState } from "react";
import ResetearContra from "./ResetearContra";
import TipoUsuario from "./TipoUsuario";

const AdminUsuario = ({
  titulo,
  descripcion1,
  descripcion2,
  descripcion3,
  texto,
  texto2,
  button2,
}) => {
  const [resetea, setResetea] = useState(false);
  const resetear = () => {
    setResetea(!resetea);
  };
  return (
    <>
      <div className="flex flex-col items-baseline justify-around w-4/5 p-10 bg-gray-800 rounded">
        <div className="flex flex-col items-baseline justify-center m-1.5">
          <h3>{titulo}</h3>
          <p>{descripcion1}</p>
          <p>{descripcion2}</p>
          <p>{descripcion3}</p>
        </div>
        <div className="flex flex-col items-baseline justify-center m-1.5">
          <label>{texto}</label>
          <input type="number" name="" id="" />
        </div>
        <div className="flex flex-col items-baseline justify-center gap-2 m-1.5">
          <input type="checkbox" name="" id="" onClick={resetear} />
          <label>{texto2}</label>
          {resetea ? <TipoUsuario /> : <ResetearContra/>}
        </div>
      </div>
    </>
  );
};

export default AdminUsuario;
