import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";

const TablaEmpleados = () => {
    const [tabla, setTabla] = useState([]);
    const peticionTablaEmpleados = async () => {
        await axios
            .get(
                "https://desarrollo.consigueventas.com/Backend/public/api/listarEmpleados",
                {
                    headers: {
                        Authorization: "Bearer 1062|VzYr7PB1AHPBvSuVjaPpGC9rIinTVjxxe7cCVwgd"
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.empleados);
            })
            .catch((e) => {
            });

    }
    const columnas = [
        {
            name: 'ID',
            selector: 'Id',
            sortable: true
        },
        {
            name: 'Nombres',
            selector: 'Nombres',
            sortable: true
        },
        {
            name: 'Apellidos',
            selector: 'Apellidos',
            sortable: true
        },
        {
            name: 'Fecha Inicio Pruebas',
            selector: 'Fecha inicio prueba',
            sortable: true
        },
        {
            name: 'Fecha Fin Prueba',
            selector: 'Fecha fin prueba',
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
            name: 'DNI',
            selector: 'Dni',
            sortable: true
        },
        {
            name: 'Carrera',
            selector: 'Carrera',
            sortable: true
        },
        {
            name: 'Telefono',
            selector: 'Telefono',
            sortable: true
        },
        {
            name: 'Link CV',
            selector: 'Link CV',
            sortable: true
        },
        {
            name: 'Correo',
            selector: 'Correo',
            sortable: true
        },

        {
            name: 'Capacitacion',
            selector: 'Condicion Capacitaci??n',
            sortable: true
        },
        {
            name: 'Link de Calificaciones',
            selector: 'Link Calificaciones',
            sortable: true
        },
        {
            name: 'Convenio',
            selector: 'Convenio',
            sortable: true
        },
        {
            name: 'Link de Convenio',
            selector: 'Link Convenio',
            sortable: true
        },
        {
            name: 'Fecha de Nacimiento',
            selector: 'Fecha Nacimiento',
            sortable: true
        },
        {
            name: 'Departamento',
            selector: 'Unidad',
            sortable: true
        },
        {
            name: 'Fecha de inicio practicas',
            selector: 'Fecha inicio practicas',
            sortable: true
        },
        {
            name: 'D??as extra',
            selector: 'D??as extra',
            sortable: true
        },
        {
            name: 'Fecha de salida de pr??cticas',
            selector: 'Fecha salida practicas',
            sortable: true
        },
        {
            name: 'Fecha de fin de pr??cticas',
            selector: 'Fecha fin practicas',
            sortable: true
        },
        {
            name: 'D??as de fin de pr??cticas',
            selector: 'D??as fin practicas',
            sortable: true
        },
        {
            name: 'N?? de d??as faltantes para su cumplea??os',
            selector: 'Nro d??as cumple',
            sortable: true
        },
        {
            name: 'Condici??n de Practicas',
            selector: 'Condici??n Practicas',
            sortable: true
        },
        {
            name: 'Estado',
            selector: 'Estado',
            sortable: true
        },
        {
            name: 'Tipo de Empleado',
            selector: 'Tipo Empleado',
            sortable: true
        },
        {
            name: 'Fecha baja',
            selector: 'Fecha baja',
            sortable: true
        },

    ]
    useEffect(() => {
        peticionTablaEmpleados();
    }, [])
    return (
        <div>
            <DataTable
                columns={columnas}
                data={tabla}
                title="Administracion de Empleados"
                pagination

            />
        </div>
    )
}

export default TablaEmpleados