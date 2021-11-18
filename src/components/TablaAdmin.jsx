import React, { useState,useEffect } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";

const TablaAdmin = () => {
    const [tabla, setTabla] = useState([]);
    const peticionTablaAdmin = async () => {
        await axios
            .get(
                "https://desarrollo.consigueventas.com/Backend/public/api/listarAdministrador",
                {
                    headers: {
                        Authorization: "Bearer 176|Ye9uwnJp6PyaPGTcJQxCB6uP85uRYoOZIXnveA9Z"
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.administradores);
            })
            .catch((e) => {
                console.log(e);
            });

    }
    const columnas=[
        {
          name:'Nombres',
          selector:'Nombre',
          sortable:true
        },
        {
            name:'Apellidos',
            selector:'Apellido',
            sortable:true
        },
        {
            name:'Turno',
            selector:'Turno',
            sortable:true
        },
        {
            name:'Perfil',
            selector:'Perfil',
            sortable:true
        },
        {
            name:'Unidad',
            selector:'Unidad',
            sortable:true
        },
        {
            name:'Dni',
            selector:'Dni',
            sortable:true
        },
        
    ]
    useEffect(() => {
        peticionTablaAdmin();
    }, [])

    return (
        <div>
            <DataTable
                columns={columnas}
                data={tabla}
                title="Lista Administradores"
                pagination

            />
        </div>
    )
}

export default TablaAdmin
