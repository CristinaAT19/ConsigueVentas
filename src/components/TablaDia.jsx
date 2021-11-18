import React, { useState,useEffect } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";

const TablaDia = () => {
    const [tabla, setTabla] = useState([]);
    const peticionTablaDia = async () => {
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
                setTabla(Response.data.AsistenciaEmpleadosDiario);
            })
            .catch((e) => {
                console.log(e);
            });

    }
    const columnas = [
        {
            name: 'Fecha',
            selector: 'Fecha',
            sortable: true
        },
        {
            name: 'Hora',
            selector: 'Hora',
            sortable: true
        },
        {
            name: 'DNI',
            selector: 'Dni',
            sortable: true
        },
        {
            name: 'Nombres',
            selector: 'Nombres',
            sortable: true
        },
        {
            name: 'Sistema Operativo',
            selector: 'Sistema Operativo',
            sortable: true
        },
        {
            name: 'Dispositivo',
            selector: 'Dispositivo',
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
            name: 'Estado',
            selector: 'Estado',
            sortable: true
        },
        {
            name: 'Turno',
            selector: 'Turno',
            sortable: true
        },
    ]
    useEffect(() => {
        peticionTablaDia();
    }, [])
    return (
        <div>
            <DataTable
                columns={columnas}
                data={tabla}
                title="Asistencia del Dia"
                pagination

            />
        </div>
    )
}

export default TablaDia;
