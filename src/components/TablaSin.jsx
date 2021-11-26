import React, { useState,useEffect } from "react";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { setToken, getToken } from "../dist/Token";
 const columns = [
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
];



function TablaSin() {
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
            setTabla(Response.data.EmpleadosSinMarcarDiario);
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
      <DataTableExtensions 
      filterPlaceholder="Buscar"
      {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          theme="solarized"
          progressPending={loading}
        />
      </DataTableExtensions>
    </div>
  );
}
const customStyles = {
    // rows: {
    //   style: {
    //     minHeight: '40px', // override the row height
    //   }
    // },
    headCells: {
        style: {
            // bordercollapse: 'collapse',
          fontSize: '1rem',
          fontweight: '900',
          backgroundColor: '#FFAC23',
          textTransform: 'uppercase'
          // paddingLeft: '0 8px'
        },
      },
      cells: {
        style: {
            bordercollapse: 'collapse',
            backgroundColor: '#FFE8C3',
          fontSize: '0.8rem',
          // paddingLeft: '0 8px',
        },
      },
    };
    createTheme('solarized', {
        text: {
          primary: '#268bd2',
          secondary: '#2aa198',
        },
        divider: {
          default: 'black',
        },

      });
export default TablaSin;
