import React, { useEffect, useState,useReducer } from "react";
import "../styles/Login.css";
import axios from "axios";
import { setToken, getToken } from "../dist/Token";
import Loading from "../components/Loading";
// import {todoReducer} from "../components/RedecurOne";

const Login = () => {

    // const initialState = [{
    //     id : new Date().getTime(),
    //     desc:"Aprender react",
    //     done:false
    // }];


    // const [todos,dispatch] = useReducer(todoReducer,initialState);
    // console.log(todos);


    // const newTodo = {
    //     id : new Date().getTime(),
    //     desc:"Otra tarae",
    //     done:false
    // }
    // const action = {
    //     type:'add',
    //     payload:newTodo
    // }

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
                setToken(Response.data.token);
            })
            .catch((e) => {
                console.log(e);
            });
        setLoading(false);
    };  


        return (
            <section className="login">
                <img
                    src="https://desarrollo.consigueventas.com/Frontend/Recursos/logo.png"
                    alt=""
                    className="login__logo"
                />
                <form action="" onSubmit={peticiontoken} className="login__formulario" id="formulario">
                    <div className="login_titulo">
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
                    { loading ? <Loading /> : 
                        <button
                            type="submit"
                            id="boton" 
                            className="login__boton" 
                            >Ingresar</button> 
                    }

                </form>
            </section>
        );
    

};

export default Login;