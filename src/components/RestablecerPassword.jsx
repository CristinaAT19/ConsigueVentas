import React, { useEffect, useState, useReducer } from "react";
import "../styles/Login.css";
import axios from "axios";
import { setToken, getToken } from "../dist/Token";

const RestablecerPassword = () => {
  const [msj, setMsj] = useState("");
  const [error, setError] = useState([]);
  const paramsRequest = {
  }
  const [valor, setValor] = useState("");
  const restablecer = async (e) => {
    e.preventDefault();
    paramsRequest['dni'] = e.target.elements.dni.value;
    console.log(valor.length);
    await axios.post(`https://desarrollo.consigueventas.com/Backend/public/api/resetearPassword`, paramsRequest,
        { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken}`
        })
        .then((Response) => {
          setMsj("el dni ha sido reseteado");
            setError([]);
        })
        .catch((e) => {
            setMsj("ha ocurrido un error");
            console.log(e);
            setError(e.response.data.errors);
        });
  };
  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 to-naranja h-screen">
        <div className="grid grid-cols-5 shadow-xl rounded-xl max-w-2xl">
            <div className="col-span-2 py-9 px-8 bg-white rounded-r-xl shadow-xl">
                <form action="" onSubmit={restablecer} id="restablecer" className="">
                    <div className="mb-3">
                        <span> Sección para reseteo y cambio de tipo de usuario </span> <br/><br/>
                        <span> - Puedes resetear el ingreso al sistema ingresando el nro de dni 
                          del empleado (La contraseña que quedará por defecto es el dni.) </span> <br/>
                        <span> - Si desmarcas el check puedes cambiar el tipo de usuario
                           del empleado (Administrador / Usuario). </span> <br/>
                        <span> - Si das click al signo de interrogación (?) , puedes saber 
                          el tipo de usuario actual del empleado . </span> <br/><br/>
                        <label for="name" className="block text-gray-800 font-bold">DNI de empleado:</label> <br/>
                        <input type="number" name="dni" placeholder="DNI" id="dni" maxLength="8" required className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />

                        {/* Error */}
                        
                        {/* <Error errors={error['dni']} ></Error> */}

                        {/* Fin error */}

                    </div>

                        <button type="submit" id="boton" >Resetear Password</button>
                        <span> {msj} </span>
                </form>
            </div>
        </div>
    </section>
  );
};
export default RestablecerPassword;

/* const url="https://desarrollo.consigueventas.com/Backend/public/api/resetearPassword";
  const parameters={ dni: '76634714' };
  const headers={ 
    Authorization: `Bearer ${getToken}`,

  };
    const peticionRestablecerPassword = async () => {
    await axios
      .post(url, parameters, headers)
      .then((response) => {
        console.log("CORRECTO CORRECTO");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    peticionRestablecerPassword();
  }, []);
    return (
        <section className="RestablecerPassword">
            <h1> OK, CAMBIADO </h1>
        </section>
    );
}; */