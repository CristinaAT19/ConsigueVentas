import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import { setToken, getToken } from "../dist/Token";
import Loading from "../components/Loading.jsx";

function TablaSin() {
    const [data, setTabla] = useState([]);
    // const [loading, setLoading] = useState(false);

    //filtros tabla
    const [selectArea, setSelectArea] = useState([]);
    const [selectUnidad, setUnidad] = useState([]);

    const [loading, setLoading] = useState(true);

    const peticionTablaDia = async () => {
      // setLoading(true);
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
          setLoading(false);
            setTabla(Response.data.EmpleadosSinMarcarDiario);
        })
        .catch((e) => {
          if(e.response.status === 403){
            console.log("No tienes permisos para ver esta información");
          }else{
          }    
        });
        // setLoading(false);
    }
    //filtros tabla
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/unidades`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      )
        .then(response => {
          setUnidad(response.data.Unidades);
          //console.log(response)
        }).catch(error => {
        })
    }, [])
  
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/areas`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      )
        .then(response => {
          setSelectArea(response.data.Areas);
          //console.log(response)
        }).catch(error => {
        })
    }, [])

    let resultArea = selectArea.map(function(item,){      
      return  `"${item}":"${item}"` 
    });
    let resultArea2=JSON.parse(`{${resultArea}}`);

    let resultUnidad = selectUnidad.map(function(item,){      
      return  `"${item}":"${item}"` 
    });
    let resultUnidad2=JSON.parse(`{${resultUnidad}}`);
    const turnos={Mañana:'Mañana',Tarde:'Tarde', ['Mañana y tarde']:'Mañana y Tarde'};
    const condPrac={Retirado:'Retirado',Ingresante:'Ingresante',['En proceso']:'En proceso',['Terminó Practicas']:'Terminó Prácticas'};
    //
    useEffect(() => {
        peticionTablaDia();
    }, [])
    // const { useState } = React;
    if (loading) {
      return <div className="flex justify-center align-center"><Loading /></div>
    }else{
  return (
    <div className="main">

        <MaterialTable
          columns={[

            {title: 'Nombres',field: 'Nombre',filtering: false},
            {title: 'Apellidos',field: 'Apellido',filtering: false},
            {title: 'DNI',field: 'Dni',filtering: false},
            {title: 'Turno',field: 'Turno',lookup:turnos},
            {title: 'Perfil',field: 'Perfil',lookup:resultArea2},
            {title: 'Departamento',field: 'Unidad',lookup:resultUnidad2},
            {title: 'Condición Practicas', field: 'Condición Practicas',lookup:condPrac}

        ]}
          data={data}

        options={{

            filtering: true,
            headerStyle: {
              backgroundColor: '#E2E2E2  ',
            },


            searchFieldAlignment: 'left',
            showTitle: false,
            exportButton: true,
            actionsColumnIndex: -1,

            

            // rowStyle: {
            //   backgroundColor: '#EEE',
            // }
          }}
          localization={{
            body: {
                emptyDataSourceMessage: "No hay registro para mostrar",
                addTooltip: 'Agregar',
                deleteTooltip: 'Eliminar',
                editTooltip: 'Editar',
                filterRow: {
                    filterTooltip: 'Filtrar'
                },

            },
            pagination: {
                labelDisplayedRows: '{from}-{to} de {count}',
                labelRowsSelect: 'filas',
                labelRowsPerPage: 'filas por pagina:',
                firstAriaLabel: 'Primera pagina',
                firstTooltip: 'Primera pagina',
                previousAriaLabel: 'Página anterior',
                previousTooltip: 'Página anterior',
                nextAriaLabel: 'Página siguiente',
                nextTooltip: 'Página siguiente',
                lastAriaLabel: 'Última pagina',
                lastTooltip: 'Última pagina'
            },
            toolbar: {
                nRowsSelected: '{0} ligne(s) sélectionée(s)',
                // showColumnsTitle: 'Voir les colonnes',
                // showColumnsAriaLabel: 'Voir les colonnes',
                exportTitle: 'Exportar',
                exportAriaLabel: 'Exportar',
                exportCSVName: "Exportar en formato CSV",
                exportPDFName: "Exportar como PDF",
                searchTooltip: 'Buscar',
                searchPlaceholder: 'Buscar'
            }
        }}
        />

    </div>
  );}
}

    
export default TablaSin;
