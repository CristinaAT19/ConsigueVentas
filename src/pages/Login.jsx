import React,{ useEffect, useState } from "react";
// import "../styles/Login.css";
import axios from "axios";
import { setToken, getToken } from "../dist/Token";

const Login = () => {
    
    const [valor, setValor] = useState("");
  const peticiontoken = async () => {
    await axios
      .post("https://desarrollo.consigueventas.com/Backend/public/api/acceso", {
        dni: "74434089",
        password: "74434089"
      })
      .then((Response) => {
        console.log(Response.data.token);
        setValor(Response.data.token);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    peticiontoken();
  }, []);

    return (
        <section className="login">
            <img
                src="https://desarrollo.consigueventas.com/Frontend/Recursos/logo.png"
                alt=""
                className="login__logo"
            />
            <form action="" className="login__formulario" id="formulario">
                <div className="login_titulo">
                    <h2 className="login__h2">{valor}</h2>
                </div>
                <div className="login__campo">
                    <input type="number" id="dni" className="login__input" placeholder="Dni" maxLength="8" required />
                </div>
                <div className="login__campo">
                    <input type="password" id="contrasena" className="login__input" placeholder="Contraseña" maxLength="8" required />
                </div>

                <button type="submit" id="boton" className="login__boton" >
                    Ingresar
                </button>
            </form>
        </section>
    );
};

export default Login;
