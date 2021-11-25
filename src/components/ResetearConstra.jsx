import React, { useState } from "react";

const ResetearConstra = () => {
  return (
    <>
      <div className="flex items-center justify-evenly m-1.5 gap-8">
        <button className="flex items-center justify-center w-56 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Resetear contraseña
        </button>
        <button className="flex items-center justify-center w-28 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
          Limpiar
        </button>
      </div>
    </>
  );
};
export default ResetearConstra;
