import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import { setToken, getToken } from "../dist/Token";
 const columns = [
    {title: 'Nombres',field: 'Nombre'},
    {title: 'Apellidos',field: 'Apellido'},
    {title: 'Turno',field: 'Turno'},
    {title: 'Perfil',field: 'Perfil'},
    {title: 'Departamento',field: 'Unidad'},
    {title: 'Dni',field: 'Dni'},
    {title: 'Condición Practicas', field: 'Condición Practicas'}
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

  return (
    <div className="main">

        <MaterialTable
          columns={columns}
          data={data}

          customStyles={customStyles}
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
    // createTheme('solarized', {
    //     text: {
    //       primary: '#268bd2',
    //       secondary: '#2aa198',
    //     },
    //     divider: {
    //       default: 'black',
    //     },

    //   });
export default TablaSin;
