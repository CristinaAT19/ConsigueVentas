import React, { useState } from 'react'
import axios from "axios";
import { setToken, getToken } from "../dist/Token";

const Configuracion = () => {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirPassword, setConfirPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const inputPassword = document.getElementById("password");
    const inputNewPassword = document.getElementById("newPassword");
    const inputConfirmPassword = document.getElementById("confirPassword");

    const clearInputs = () => {
        inputPassword.value = '';
        inputNewPassword.value = '';
        inputConfirmPassword.value = '';
        setPasswordError('');
    }

    const clearErrors = () => {
        setPasswordError('');
    }

    const validarInputs = () => {
        if (inputPassword.value != '' &&
            inputNewPassword.value != '' &&
            inputConfirmPassword.value != '')
            return true
    }

    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }

    const bodyParameters = {
        oldPassword: password,
        newPassword: newPassword
    };

    const handleChangePass = () => {
        clearErrors();
        if (!validarInputs()) {
            setPasswordError('LLenar todos los campos');
            return true;
        }
        if (newPassword != confirPassword) {
            setPasswordError('La nueva contraseña y confirmar contraseña no coinciden!');
            return true;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/cambiarPassword`, bodyParameters, config)
            .then((Response) => {
                setPasswordError(Response.data.mensaje);
            })
            .catch((e) => {
                // console.log(e.response.data.errors);
                setPasswordError(e.response.data.errors.oldPassword + " " + e.response.data.errors.newPassword);
            });

    };

    return (
        <>
            <div className="w-4/5 mx-auto mt-14">
                <h2 className="text-gray-50 bg-gray-700 text-2xl font-bold uppercase text-center py-4">
                    Configuración de usuario
                </h2>
                <div className="rounded-b-2xl shadow-md bg-white flex flex-col justify-center p-5">
                    <div className='flex flex-wrap justify-center'>
                        <div className="px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-xs font-bold mb-2">
                                Contraseña actual (DNI por defecto)
                                </label>
                                <input onChange={(e) => setPassword(e.target.value)} class="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" type="text" name="password" id="password" minLength="4" maxLength="20" required />
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-xs font-bold mb-2">
                                Nueva contraseña
                                </label>
                                <input onChange={(e) => setNewPassword(e.target.value)} class="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" type="password" name="newPassword" minLength="4" maxLength="20"  id="newPassword" required />
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-xs font-bold mb-2">
                                Confirmar contraseña
                                </label>
                                <input onChange={(e) => setConfirPassword(e.target.value)} class="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" type="password" name="confirPassword" id="confirPassword" required />

                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="w-full ">
                        <p class="text-red-500 text-center font-bold my-2">{passwordError}</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 py-2 mt-3"> 
                        <button className="flex items-center justify-center w-56 bg-gray-700 hover:bg-naranjaBajo text-gray-50 h-1/5 py-2 rounded-md" onClick={handleChangePass}>
                            Cambiar Contraseña
                        </button>
                        <button className="flex items-center justify-center w-56 bg-gray-700 hover:bg-naranjaBajo text-gray-50 h-1/5 py-2 rounded-md" onClick={clearInputs}>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Configuracion;
