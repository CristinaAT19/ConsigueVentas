import React from 'react'

const Configuracion = () => {
    return (
        <>
            <div className="text-white w-11/12 flex flex-col items-baseline justify-start p-20">
                <h2 className="text-3xl text-gray-800 mb-2">Configuración de usuario</h2>
                <div className="bg-gray-800 flex flex-col items-baseline justify-start p-5">
                    <label className="">Contraseña actual (Dni por defecto)</label>
                    <input type="text" name="" id="" />
                    <label className="">Nueva contraseña</label>
                    <input type="password" name="" id="" />
                    <label className="">Confirmar contraseña</label>
                    <input type="password" name="" id="" />

                    <div className="flex items-center justify-between gap-5 py-2">
                        <button className="rounded bg-naranjaBajo p-1 hover:bg-yellow-500">Cambiar Contraseña</button>
                        <button className="rounded bg-naranjaBajo p-1 hover:bg-naranja">Limpiar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Configuracion;
