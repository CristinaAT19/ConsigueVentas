import React from "react";
import * as FaIcons from "react-icons/fa";

const TipoUsuario = () => {
  return (
    <>
      <FaIcons.FaRegQuestionCircle />
      <div className="flex items-center justify-start">
        <input type="radio" name="" id="" />
        <label>Administrador</label>
      </div>
      <div className="flex items-center justify-start">
        <input type="radio" name="" id="" />
        <label>Usuario</label>
      </div>

      <div className="flex items-center justify-evenly m-1.5 gap-8">
        <button className="flex items-center justify-center w-56 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Cambiar tipo de Usuario
        </button>
        <button className="flex items-center justify-center w-28 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Limpiar
        </button>
      </div>
    </>
  );
};

export default TipoUsuario;
