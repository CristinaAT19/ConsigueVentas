import MaterialTable from 'material-table';
import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { setToken, getToken } from "../dist/Token";
import axios from "axios";
import Loading from "../components/Loading";



const TablaAdmin = () => {
    const [tabla, setTabla] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const cambiarEstado=()=>{
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    }
    //filtros tabla
    const [selectArea, setSelectArea] = useState([]);
    const [selectUnidad, setUnidad] = useState([]);

    const peticionTablaAdmin = async () => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/listarAdministrador`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.administradores);
            })
            .catch((e) => {
            });

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
    //

    useEffect(() => {
        cambiarEstado();
        peticionTablaAdmin();
    }, [])

    if (loading) {
        return (<Loading />)
    }else{
    return (
        <div>
            <MaterialTable
                columns={[
                    {
                        title: 'Nombres', field: 'Nombre',filtering: false
                    },
                    {
                        title: 'Apellidos',
                        field: 'Apellido',
                        filtering: false
                    },
                    {
                        title: 'Turno',
                        field: 'Turno',
                        lookup:turnos
                    },
                    {
                        title: 'Perfil',
                        field: 'Perfil',
                        lookup:resultArea2
                    },
                    {
                        title: 'Unidad',
                        field: 'Unidad',
                        lookup:resultUnidad2
                    },
                    {
                        title: 'Dni',
                        field: 'Dni',
                        filtering: false
                    },


                ]}
                data={tabla}
                title="Tabla de Administradores"
                // tableRef={tableRef}
                // actions={[
                //   {
                //     icon: 'edit',
                //     tooltip: 'Editar Empleado',
                //     // onClick: (event, rowData) => seleccionarEmpleado(rowData, "Editar")
                //   },
                //   {
                //     icon: 'refresh',
                //     tooltip: 'Refresh Data',
                //     isFreeAction: true,
                //     onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                //   }
                // ]}
                options={{
                    // fixedColumns: {

                    //   right: 1
                    // },
                    filtering: true,
                    headerStyle: {
                        backgroundColor: '#E2E2E2  ',
                    },
                    exportButton: true,
                    actionsColumnIndex: -1,
                    
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
                        exportCSVName: "Exportar en formato CSV",
                        exportPDFName: "Exportar como PDF",
                        searchTooltip: 'Buscar',
                        searchPlaceholder: 'Buscar'
                    },
                    header: {
                        actions: 'Acciones'
                    }
                }}

            />

        </div>
    )
            }
}

export default TablaAdmin
