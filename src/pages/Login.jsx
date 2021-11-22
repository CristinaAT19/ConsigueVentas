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
        <section className="flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 to-naranja h-screen">
            <div className="grid grid-cols-5 shadow-xl rounded-xl max-w-2xl">
                <div className="col-span-3 py-9 px-8 bg-gray-50 rounded-l-xl h-full">
                    <div className="flex justify-center h-1/3">
                        <img src="https://desarrollo.consigueventas.com/Frontend/Recursos/logoCompleto.png"
                            className="h-20 pl-4 bg-gray-50"
                        />
                        {/* <img src="icono-cventas.png"
                            className=" h-20 bg-gray-50"
                        /> */}
                        
                    </div>
                    <div className="h-2/3 flex items-center pt-10 justify-center">
                        <img className="" src="icons8-admin.png"/>
                        <span className="bg-white p-2 text-center shadow-md rounded-xl">Recuerda que tu usuario y contraseña es tu DNI</span>
                    </div>
                </div>
                <div className="col-span-2 py-9 px-8 bg-white rounded-r-xl shadow-xl">
                    <form action="" id="formulario" className="">
                        <div className="mb-3">
                            <label for="name" className="block text-gray-800 font-bold">Usuario</label>
                            <input type="number" placeholder="Es tu DNI" id="dni" maxLength="8" required className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        </div>
                        <div>
                            <label for="email" className="block text-gray-800 font-bold">Contraseña</label>
                            <input type="password" placeholder="Contraseña" id="contrasena" maxLength="8" required className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        
                        </div>
                        <buttom type="submit" id="boton" className="cursor-pointer py-2 px-6 block mt-6 duration-75 bg-plomo hover:bg-gray-700  text-white font-bold w-full text-center rounded">Ingresar</buttom>
                    </form>
                </div>
            </div>            
            {/* <img
                src="https://desarrollo.consigueventas.com/Frontend/Recursos/logo.png"
                className="login__logo border-2 w-20 h-20 border-gray-50 relative rounded-full"
            />
            <form action="" className="login__formulario border-2 bg-white flex flex-col items-center justify-center p-4 rounded-xl border-yellow-600" id="formulario">
                <div className="login_titulo items-center">
                    <h2 className="login__h2 text-gray-800">{valor}</h2>
                </div>
                <div className="login__campo items-center">
                    <input
                        type="number"
                        id="dni"
                        className="login__input border"
                        placeholder="Dni"
                        maxLength="8"
                        required
                    />
                </div>
                <div className="login__campo">
                    <input
                        type="password"
                        id="contrasena"
                        className="login__input border"
                        placeholder="Contraseña"
                        maxLength="8"
                        required
                    />
                </div>

                <button
                    type="submit"
                    id="boton"
                    className="login__boton"
                >
                    Ingresar
                </button>
            </form> */}
        </section>
    );
};

export default Login;
