import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import { setToken, getToken } from "../dist/Token";
import Loading from "../components/Loading.jsx";




function TablaSin() {
    const [data, setTabla] = useState([]);
    // const [loading, setLoading] = useState(false);

    const [loading, setLoading] = useState(false);

    const cambiarEstado=()=>{
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

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
    useEffect(() => {
      cambiarEstado();
        peticionTablaDia();
    }, [])
    // const { useState } = React;
    const [selectedRow, setSelectedRow] = useState(null);
    if (loading) {
      return (<Loading />)
    }else{
  return (
    <div className="main">

        <MaterialTable
          columns={[
            {title: 'Dni',field: 'Dni',filtering: false},
            {title: 'Nombres',field: 'Nombre', filtering: false},
            {title: 'Apellidos',field: 'Apellido', filtering: false},
            {title: 'Turno',field: 'Turno',lookup:{Mañana:'Mañana',Tarde:'Tarde', ['Mañana y tarde']:'Mañana y Tarde'
          }},
            {title: 'Perfil',field: 'Perfil'},
            {title: 'Departamento',field: 'Unidad'},

            {title: 'Condición Convenio', field: 'Condición Practicas',lookup:{Firmado:'Firmado',['Enviado para firmar']:'Enviado para firmar',['No firmado']:'No firmado',['Terminó convenio']:'Terminó convenio',['En proceso']:'En proceso','Retirado':'Retirado'}},
        ]}
          data={data}

        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{
            searchFieldAlignment: 'left',
            showTitle: false,
            exportButton: true,
            actionsColumnIndex: -1,
            filtering: true,
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
                previousAriaLabel: 'Pagina anterior',
                previousTooltip: 'Pagina anterior',
                nextAriaLabel: 'Pagina siguiente',
                nextTooltip: 'Pagina siguiente',
                lastAriaLabel: 'Ultima pagina',
                lastTooltip: 'Ultima pagina'
            },
            toolbar: {
                nRowsSelected: '{0} ligne(s) sélectionée(s)',
                // showColumnsTitle: 'Voir les colonnes',
                // showColumnsAriaLabel: 'Voir les colonnes',
                exportTitle: 'Exportar',
                exportAriaLabel: 'Exportar',
                exportName: 'Exportar como CSV',
                searchTooltip: 'Buscar',
                searchPlaceholder: 'Buscar'
            }
        }}
        />

    </div>
  );}
}

    
export default TablaSin;
