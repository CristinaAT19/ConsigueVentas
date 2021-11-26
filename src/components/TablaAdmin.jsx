import React, { useState,useEffect } from "react";
import DataTable from 'react-data-table-component';
import { setToken, getToken } from "../dist/Token";
import axios from "axios";

const TablaAdmin = () => {
    const [tabla, setTabla] = useState([]);
    
    const peticionTablaAdmin = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/listarAdministrador`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
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
