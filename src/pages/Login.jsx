import React from 'react'
import "../styles/Login.css"

const Login = () => {
    return (
        <section className="login">
            <img
                src="https://desarrollo.consigueventas.com/Frontend/Recursos/logo.png"
                alt=""
                className="login__logo"
            />
            <form action="" className="login__formulario" id="formulario">
                <div className="login_titulo">
                    <h2 className="login__h2">Acceso</h2>
                </div>
                <div className="login__campo">
                   
                    <input type="number" id="dni" className="login__input"  placeholder="Dni" maxlength="8" required/>
                </div>
                <div className="login__campo">
                    
                    <input type="password" id="contrasena" className="login__input" placeholder="Contraseña" maxlength="8" required />
                </div>

                <button type="submit" id="boton" className="login__boton">
                    Ingresar
                </button>
            </form>
        </section>
    )
}

export default Login
