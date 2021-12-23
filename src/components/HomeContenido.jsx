import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const HomeContenido = ({ imagen, subTitulo }) => {
  const Images = require.context("../images");
  const [redirect, setRedirect] = useState(false);
  const handleIngresar = (e) => {
    e.preventDefault();
    setRedirect(true);
  }
  if (redirect) {
    return <Redirect to="/dashAdmin"/>
  }
  return (
    <>
      <div className="subcontenido bg-white flex flex-col justify-center items-center p-8 rounded-2xl">
        <button onClick={handleIngresar} className="text-center w-full h-full hover:no-underline">
          <img
            src={Images(`./${imagen}`).default}
            alt=""
            className="seleccion"
          />
          <h2 className="text-xl font-medium hover:text-naranja">
            {subTitulo}
          </h2>
        </button>
      </div>
    </>
  );
};

export default HomeContenido;
