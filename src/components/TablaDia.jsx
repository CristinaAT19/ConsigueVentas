import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import { setToken, getToken } from "../dist/Token";

 const columns = [
    {title: 'Fecha',field: 'Fecha'},
    {title: 'Hora',field: 'Hora'},
    {title: 'Dni',field: 'Dni'},
    {title: 'Nombres',field: 'Nombres'},
    {title: 'Sistema Operativo',field: 'Sistema Operativo'},
    {title: 'Dispositivo',field: 'Dispositivo'},
    {title: 'Perfil',field: 'Perfil'},
    {title: 'Departamento',field: 'Unidad'},
    {title: 'Estado',field: 'Estado'},
    {title: 'Turno',field: 'Turno'},
];



function TablaDia() {
    const [data, setTabla] = useState([]);
    const [loading, setLoading] = useState(false);
    const peticionTablaDia = async () => {
      setLoading(true);
        await axios
            .get(
              `${process.env.REACT_APP_API_URL}/api/tablas_administrador`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.AsistenciaEmpleadosDiario);
            })
            .catch((e) => {
                if(e.response.status === 403){
                  console.log("No tienes permisos para ver esta información");
                }else{
                }
            });
            setLoading(false);
    }
    useEffect(() => {
        peticionTablaDia();
      }, [])
  const tableData = {
    columns,
    data
  };

  return (
    <div className="main">
        <MaterialTable
          columns={columns}
          data={data}

          options={{
            searchFieldAlignment: 'left',
            showTitle: false,
            exportButton: true,
            actionsColumnIndex: -1
          }}
        />
    </div>
  );
}

export default TablaDia;
