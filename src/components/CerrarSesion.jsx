import { useEffect } from "preact/hooks";
import React from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { removeToken } from "../dist/Token";
const CerrarSesion = () => {
    // useEffect(() => {
    //     console.log("CerrarSesion");
    //     // removeToken();
    //     <Redirect to="/login" />
    // }, [])
    const history = useHistory();
    // const location = useLocation();
    // const handleClick = () => {
    //     history.push("/login");
    // }
    // history.location.pathname = "/login";
    // history.push("/login");
    // console.log(location);
    // useEffect(() => {
    //     handleClick();
    // }, [])


    return (
        <div>Cerrar Sesion</div>
    );
}

export default CerrarSesion;