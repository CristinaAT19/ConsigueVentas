import React, { useState,useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

 const columns = [
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
    }
];



function TablaDia() {
    const [data, setTabla] = useState([]);
    const [loading, setLoading] = useState(false);
    const peticionTablaDia = async () => {
      setLoading(true);
        await axios
            .get(
                "https://desarrollo.consigueventas.com/Backend/public/api/tablas_administrador",
                {
                    headers: {
                        Authorization: "Bearer 634|2Zhl6NbfvAai75pfTlJ9bX6qAm81FCOPVmkpvuVq"
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.AsistenciaEmpleadosDiario);
            })
            .catch((e) => {
                console.log(e);
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
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          progressPending={loading}
        />
      </DataTableExtensions>
    </div>
  );
}
const customStyles = {
    // rows: {
    //   style: {
    //     minHeight: '72px', // override the row height
    //   }
    // },
    headCells: {
      style: {
        fontSize: '1rem',
        fontweight: '900',
        textTransform: 'uppercase',
        // paddingLeft: '0 8px'
      },
    },
    cells: {
      style: {
        fontSize: '0.8rem',
        // paddingLeft: '0 8px',
      },
    },
  };
export default TablaDia;
