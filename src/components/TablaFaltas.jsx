import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";

const TablaFaltas = () => {
    const [tabla, setTabla] = useState([]);
    const peticionTablaFaltas = async () => {
        await axios
            .get(
                "https://desarrollo.consigueventas.com/Backend/public/api/tabla_faltas",
                {
                    headers: {
<<<<<<< HEAD
                        Authorization: "528|RtyDQ6TzXjCZ6DeoNaauvx8EgrBsmwvGCYbWTeGj"
=======
                        Authorization: "Bearer 624|yr3V76pOi2wXinTHeyQGXRzNx1WYGYnOvXOPOVFn"
>>>>>>> 7a6c3e3e641ec6378831cfa333740f327d42418c
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
