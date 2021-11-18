import React, { useState,useEffect } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";
const TablaSin = () => {
    const [tabla, setTabla] = useState([])
    const peticionTablaSin = async () => {
        await axios
            .get(
                "https://desarrollo.consigueventas.com/Backend/public/api/tablas_administrador",
                {
                    headers: {
                        Authorization: "Bearer 176|Ye9uwnJp6PyaPGTcJQxCB6uP85uRYoOZIXnveA9Z"
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.EmpleadosSinMarcarDiario);
            })
            .catch((e) => {
                console.log(e);
            });

    }
    const columnas = [
        {
            name: 'Nombres',
            selector: 'Nombre',
            sortable: true
        },
        {
            name: 'Apellidos',
            selector: 'Apellido',
            sortable: true
        },
        {
            name: 'Turno',
            selector: 'Turno',
            sortable: true
        },
        {
            name: 'Perfil',
            selector: 'Perfil',
            sortable: true
        },
        {
            name: 'Departamento',
            selector: 'Unidad',
            sortable: true
        },
        {
            name: 'Dni',
            selector: 'Dni',
            sortable: true
        },
        {
            name: 'Condición de Practicas',
            selector: 'Condición Practicas',
            sortable: true
        },
    ]
    useEffect(() => {
        peticionTablaSin();
    }, [])
    return (
        <div>
        <DataTable
            columns={columnas}
            data={tabla}
            title="Sin marcar Asistencia"
            pagination

        />
    </div>
    )
}

export default TablaSin
