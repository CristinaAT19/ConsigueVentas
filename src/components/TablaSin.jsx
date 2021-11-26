import React, { useState,useEffect } from "react";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

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
<<<<<<< HEAD
            .get(
                "https://desarrollo.consigueventas.com/Backend/public/api/tablas_administrador",
                {
                    headers: {
                        Authorization: "Bearer 528|RtyDQ6TzXjCZ6DeoNaauvx8EgrBsmwvGCYbWTeGj"
                    }
=======
        .get(
            "https://desarrollo.consigueventas.com/Backend/public/api/tablas_administrador",
            {
                headers: {
                    Authorization: "Bearer 677|brZgrPFNk78A3Ju7qsaDHWB7yPCoTVQkBseYZRvp"
>>>>>>> 7a6c3e3e641ec6378831cfa333740f327d42418c
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
      <DataTableExtensions {...tableData}>
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
    //     minHeight: '72px', // override the row height
    //   }
    // },
    headCells: {
        style: {
            bordercollapse: 'collapse',
          fontSize: '1rem',
          fontweight: '900',
          textTransform: 'uppercase',
          // paddingLeft: '0 8px'
        },
      },
      cells: {
        style: {
            bordercollapse: 'collapse',
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
        background: {
          default: '#FFFFFF',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#F7F7F7',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      });
export default TablaSin;
