import React from 'react'

const Configuracion = () => {
    return (
        <>
            <div className="w-4/5 mx-auto mt-14">
                <h2 className="text-gray-50 bg-gray-700 text-2xl font-bold uppercase text-center py-4">Configuración de usuario</h2>
                <div className="rounded-b-2xl shadow-md bg-white flex flex-wrap items-baseline justify-center p-5">
                    <div className="px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-xs font-bold mb-2">
                            Contraseña actual (DNI por defecto)
                            </label>
                            <input class="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" type="text" name="" id="" />
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-xs font-bold mb-2">
                            Nueva contraseña
                            </label>
                            <input class="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" type="text" name="" id="" />
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-xs font-bold mb-2">
                            Confirmar contraseña
                            </label>
                            <input class="border px-3 py-3 bg-gray-50  rounded text-sm shadow-md" type="text" name="" id="" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 py-2 mt-3">
                        <button className="flex items-center justify-center w-56 bg-gray-700 text-gray-50 h-1/5 py-2 rounded-md">Cambiar Contraseña</button>
                        <button className="flex items-center justify-center w-56 bg-gray-700 text-gray-50 h-1/5 py-2 rounded-md">Limpiar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Configuracion;
