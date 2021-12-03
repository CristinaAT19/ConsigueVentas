import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";

const TablaFaltas = () => {
    const [tabla, setTabla] = useState([]);
    const peticionTablaFaltas = async () => {
        await axios
            .get(
                "http://127.0.0.1:8000/api/tabla_faltas",
                {
                    headers: {
                        Authorization: "Bearer 1062|VzYr7PB1AHPBvSuVjaPpGC9rIinTVjxxe7cCVwgd"
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.data);
            })
            .catch((e) => {
                console.log(e);
            });

    }
    const columnas1=[
        {
          name:'Id',
          selector:'Id',
          sortable:true
        },
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
            name:'Dni',
            selector:'Dni',
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
            name:'Turno',
            selector:'Turno',
            sortable:true
        },
        {
            name:'Fecha de Falta',
            selector:'Fecha Falta',
            sortable:true
        },
        {
            name:'Estado de Falta',
            selector:'Estado Falta',
            sortable:true
        },
    ]
    useEffect(() => {
        peticionTablaFaltas();
    }, [])
    return (
        <div>
        <DataTable
            columns={columnas1}
            data={tabla}
            title="Tabla Faltas"
            pagination

        />
    </div>
    )
}

export default TablaFaltas
