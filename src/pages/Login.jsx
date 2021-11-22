import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { setToken, getToken } from "../dist/Token";
import Loading from "../components/Loading";

const Login = () => {

    const [loading, setLoading] = useState(false);
    const paramsRequest = {
        "dni": "74434089",
        "password": "74434089"
    }
    const [valor, setValor] = useState("");
    const peticiontoken = async (e) => {
        setLoading(true);
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_API_URL}/api/acceso`, paramsRequest)
            .then((Response) => {
                console.log(Response);
                setValor(Response.data.token);
            })
            .catch((e) => {
                console.log(e);
            });
        console.log(valor);
        setLoading(false);

    };

    const mandarina = () => {
        return "Vacaciones"; 
    }

    if (loading == true) {
        return <Loading loading={loading} mandarina={mandarina}/>;
    } else {

        return (
            <section className="login">
                <img
                    src="https://desarrollo.consigueventas.com/Frontend/Recursos/logo.png"
                    alt=""
                    className="login__logo"
                />
                <form action="" className="login__formulario" id="formulario">
                    <div className="login_titulo">
                        {/* <h2 className="login__h2">{valor}</h2> */}
                    </div>
                    <div className="login__campo">
                        <input
                            type="number"
                            id="dni"
                            className="login__input"
                            placeholder="Dni"
                            maxLength="8"
                            required
                        />
                    </div>
                    <div className="login__campo">
                        <input
                            type="password"
                            id="contrasena"
                            className="login__input"
                            placeholder="Contraseña"
                            maxLength="8"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        id="boton"
                        className="login__boton"
                        onClick={peticiontoken}
                    >
                        Ingresar
                    </button>
                </form>
            </section>
        );
    }

};

export default Login;
