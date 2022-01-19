import React, { useContext, useState, useRef } from "react";
import "../css/style.scss";
import axios from "axios";
import { setToken } from "../dist/Token";
import LoginSpinner from "../components/LoginSpinner";
import Error from "../components/item/Error";
import { Redirect } from "react-router";
import { distSetAutentication, distSetUser } from "../dist/Autentication";
import { UserContext } from "../components/context/UserContext";

const Login = () => {
  const campo = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const paramsRequest = {};
  const [valor, setValor] = useState("");
  //   Contexto de usuario
  const { user, setUser } = useContext(UserContext);

  const onInputDni = () => {
    if (campo.current.value.length > 8) {
      campo.current.value = campo.current.value.slice(0, 8);
    }
  };

  const peticiontoken = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (e.target.elements.dni.value.length !== 8) {
      const error = {
        dni: "El DNI debe tener 8 números",
      };
      setError(error);
      setLoading(false);
      return;
    }

    if (isNaN(e.target.elements.dni.value)) {
      const error = {
        dni: "El DNI debe ser un dato numérico",
      };
      setError(error);
      setLoading(false);
      return;
    }
    paramsRequest["dni"] = e.target.elements.dni.value;
    paramsRequest["password"] = e.target.elements.password.value;

    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/acceso`, paramsRequest, {})
      .then((Response) => {
        setUser({
          dni: Response.data.dni,
          nombre: Response.data.nombre,
          apellido: Response.data.apellido,
          id_TipoUsuario: Response.data.id_TipoUsuario,
          TipoUsuario: Response.data.TipoUsuario,
          perfil: Response.data.perfil,
          unidad: Response.data.unidad,
          turno: Response.data.turno,
        });
        setToken(Response.data.token);
        distSetAutentication(true);
        distSetUser(Response.data);
        setRedirect(true);
        setError([]);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          const error = {
            dni: "Recurso no encontrado.",
          };
          setError(error);
        } else if (e.response.status === 500) {
          const error = {
            dni: "Problemas al intentar contectar con el servidor.",
          };
          setError(error);
        } else {
          setError(e.response.data.errors);
        }
      });
    setLoading(false);
  };

  // useEffect(() => {
  //     console.log("redirecionando");
  //     <Redirect to='/dashAdmin'/>;
  //     console.log("Fin");
  // }, [redirect]);

  if (redirect) {
    return <Redirect to="/home" />;
  }
  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 to-yellow-700 h-screen">
      <div className="flex md:grid md:grid-cols-5 shadow-xl mx-2 sm:mx-0 max-w-2xl">
        <div className="hidden md:grid md:col-span-3 py-4 px-8 bg-gray-50 rounded-l-xl h-full">
          <div className="flex justify-center h-1/3">
            <img
              src="https://desarrollo.consigueventas.com/Frontend/Recursos/logoCompleto.png"
              className="h-20 pl-4 bg-gray-50"
            />
          </div>
          <div className="h-2/3 flex items-center pt-10 justify-center">
            <img className="" src="icons8-admin.png" />
            <span className="bg-white p-2 text-center shadow-md rounded-xl">
              Recuerda que tu usuario y contraseña es tu DNI
            </span>
          </div>
          <div className="flex justify-center mb-3">
            <button
              type="submit"
              id="boton"
              onClick={() => {
                window.location.replace(
                  "https://erp.consigueventas.com/sistema/marcacion/"
                );
              }}
              className="cursor-pointer py-2 px-6 block duration-75 bg-naranja hover:bg-yellow-300 text-white font-bold w-32 text-center rounded"
            >
              Marcación
            </button>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-center content-center flex-column py-4 px-8 bg-white rounded-xl md:rounded-l-none shadow-xl">
          <div className=" md:hidden flex justify-center border-b pt-2 pb-3">
            <img
              // src="icono-cventas.png"
              src="https://desarrollo.consigueventas.com/Frontend/Recursos/logoCompleto.png"
              className="h-16"
            />
          </div>
          <form
            action=""
            onSubmit={peticiontoken}
            id="formulario"
            className="md:mt-0"
          >
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-800 font-bold">
                Usuario
              </label>
              <input
                type="number"
                name="dni"
                ref={campo}
                onInput={onInputDni}
                placeholder="Es tu DNI"
                id="dni"
                maxLength="8"
                required
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />

              {/* Error */}

              <Error errors={error["dni"]}></Error>

              {/* Fin error */}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-800 font-bold">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                id="contrasena"
                maxLength="20"
                required
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              {/* Error */}

              <Error errors={error["smg"]}></Error>

              {/* Fin error */}
            </div>

            {loading ? (
              <LoginSpinner />
            ) : (
              <button
                type="submit"
                id="boton"
                className="cursor-pointer py-2 px-6 border-gray-900 block mt-6 duration-75 bg-gray-900 hover:bg-gray-700  text-white font-bold border-2 w-full text-center rounded"
              >
                Ingresar
              </button>
            )}

            <button
              type="submit"
              id="boton"
              onClick={() => {
                window.location.replace(
                  "https://erp.consigueventas.com/sistema/marcacion/"
                );
              }}
              className="cursor-pointer mt-3 py-2 px-6  duration-75 bg-naranja hover:bg-yellow-300 text-white font-bold w-full text-center rounded block md:hidden"
            >
              Marcación
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
