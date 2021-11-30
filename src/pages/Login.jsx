import React, { useState} from "react";
import '../css/style.scss';
import axios from "axios";
import { setToken } from "../dist/Token";
import Loading from "../components/Loading";
import Error from "../components/item/Error";
import { Redirect } from "react-router";


const Login = () => {

   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const paramsRequest = {
    }
    const [valor, setValor] = useState("");
    const peticiontoken = async (e) => {
        setLoading(true);
        e.preventDefault();
        if(e.target.elements.dni.value.length !== 8){
            const error = {
                "dni": "El dni debe tener 8 numeros",
            };
            setError(error);
            setLoading(false);
            return;
        }

        if(isNaN(e.target.elements.dni.value)){
            const error = {
                "dni": "El dni debe ser un dato numerico",
            };
            setError(error);
            setLoading(false);    
            return;
        }


        paramsRequest['dni'] = e.target.elements.dni.value;
        paramsRequest['password'] = e.target.elements.password.value;

        await axios.post(`${process.env.REACT_APP_API_URL}/api/acceso`, paramsRequest)
            .then((Response) => {
                setToken(Response.data.token);
                setRedirect(true);
                setError([]);
            })
            .catch((e) => {
                setError(e.response.data.errors);
                // console.log(e);
            });
        setLoading(false);
    };

    // useEffect(() => {
    //     console.log("redirecionando");
    //     <Redirect to='/dashAdmin'/>;
    //     console.log("Fin");
    // }, [redirect]);

    if (redirect) {
        return <Redirect to='/dashadmin'/>;
    }
    return (
        <section className="flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 to-yellow-600 h-screen">
            <div className="grid grid-cols-5 shadow-xl rounded-xl max-w-2xl">
                <div className="col-span-3 py-9 px-8 bg-gray-50 rounded-l-xl h-full">
                    <div className="flex justify-center h-1/3">
                        <img src="https://desarrollo.consigueventas.com/Frontend/Recursos/logoCompleto.png"
                            className="h-20 pl-4 bg-gray-50"
                        />                        
                    </div>
                    <div className="h-2/3 flex items-center pt-10 justify-center">
                        <img className="" src="icons8-admin.png" />
                        <span className="bg-white p-2 text-center shadow-md rounded-xl">Recuerda que tu usuario y contraseña es tu DNI</span>
                    </div>
                </div>
                <div className="col-span-2 py-9 px-8 bg-white rounded-r-xl shadow-xl">
                    <form action="" onSubmit={peticiontoken} id="formulario" className="">
                        <div className="mb-3">
                            <label for="name" className="block text-gray-800 font-bold">Usuario</label>
                            <input type="number" name="dni" placeholder="Es tu DNI" id="dni" maxLength="8" required className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />

                            {/* Error */}
                            
                            <Error errors={error['dni']} ></Error>

                            {/* Fin error */}

                        </div>
                        <div>
                            <label for="email" className="block text-gray-800 font-bold">Contraseña</label>
                            <input type="password" name="password" placeholder="Contraseña" id="contrasena" maxLength="8" required className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                            {/* Error */}
                            
                            <Error errors={error['smg']} ></Error>

                            {/* Fin error */}
                        </div>

                        {loading ? <Loading /> :

                            <button type="submit" id="boton" className="cursor-pointer py-2 px-6 block mt-6 duration-75 bg-gray-900 hover:bg-gray-700  text-white font-bold w-full text-center rounded">Ingresar</button>

                        }

                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;