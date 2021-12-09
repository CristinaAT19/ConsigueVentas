import React, {useState } from 'react'
import axios from "axios";
import { setToken, getToken } from "../dist/Token";

const Configuracion = () => {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirPassword, setConfirPassword] = useState('');
    const [passwordError,setPasswordError]=useState('');

    const inputPassword=document.getElementById("password");
    const inputNewPassword=document.getElementById("newPassword");
    const inputConfirmPassword=document.getElementById("confirPassword");
    
    const clearInputs=()=>{
        inputPassword.value='';
        inputNewPassword.value='';
        inputConfirmPassword.value='';
        setPasswordError('');
      }
      
      const clearErrors=()=>{
        setPasswordError('');
      }
    
    const validarInputs=()=>{
        if(inputPassword.value!=''&&
        inputNewPassword.value!=''&&
        inputConfirmPassword.value!='')
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

     const handleChangePass=()=>{
        clearErrors();
        if(!validarInputs()){
            setPasswordError('LLenar todos los campos');
            return true;
        }
        if(newPassword!=confirPassword){
            setPasswordError('Confirmar contraseña diferente!');
            return true; 
        }
         axios.post(`${process.env.REACT_APP_API_URL}/api/cambiarPassword`, bodyParameters,config)
                .then((Response) => {
                        setPasswordError(Response.data.mensaje);
                    })
                    .catch((e) => {
                        setPasswordError("Ocurrio un error");
                    });
        
      };

    return (
        <>
            <div>
                <h2 className="text-3xl text-gray-800 mb-2">Configuración de usuario</h2>
                <div className="bg-gray-800 flex flex-col items-baseline justify-start p-5">
                    <label className="">Contraseña actual (Dni por defecto)</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="text" name="password" id="password" required/>
                    <label className="">Nueva contraseña</label>
                    <input onChange={(e)=>setNewPassword(e.target.value)} type="password" name="newPassword" id="newPassword" required/>
                    <label className="">Confirmar contraseña</label>
                    <input onChange={(e)=>setConfirPassword(e.target.value)} type="password" name="confirPassword" id="confirPassword" required />
                    <p className="text-red-500">{passwordError}</p>                    
                    <div className="flex items-center justify-between gap-5 py-2">
                        <button onClick={handleChangePass} className="rounded bg-naranjaBajo p-1 hover:bg-yellow-500">Cambiar Contraseña</button>
                        <button onClick={clearInputs} className="rounded bg-naranjaBajo p-1 hover:bg-naranja">Limpiar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Configuracion;
