import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Loading from "../components/Loading";
import { setToken, getToken } from "../dist/Token";


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '21rem',
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxshadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

function ReporteAsistencia() {
    const [filtering, setFiltering] = useState(false);
    const [data, setTabla] = useState([]);
    // const [loading, setLoading] = useState(false);
    //filtros tabla
    const [selectArea, setSelectArea] = useState([]);
    const [selectUnidad, setUnidad] = useState([]);
    const [fechaIni,setFechaIni]=useState('');
    const [fechaFin,setFechaFin]=useState('');

    const fechas={
      "fecha_fin": "2021-11-01",
      "fecha_inicio": "2021-12-01"      
    }
    const peticionTablaDia = async () => {
      // setLoading(true);
        await axios
            .get(
              `${process.env.REACT_APP_API_URL}/api/asistenciaTotal`,             
                {
                    headers: {
                      'Authorization': `Bearer ${getToken()}`
                    },
                }
            )
            .then((Response) => {
                setTabla(Response.data.Asistencias);
            })
            .catch((e) => {
                if(e.response.status === 403){
                  console.log("No tienes permisos para ver esta información");
                }else{
                }
                console.log(e.response)
            });
            // setLoading(false);
    }
    //filtros fecha
    const peticionFiltroFecha = async () => {
      // setLoading(true);
        await axios
            .get(
              // `${process.env.REACT_APP_API_URL}/api/asistenciaTotal`,
              `${process.env.REACT_APP_API_URL}/api/filtradoFecha`,
                {
                    headers: {
                      'Authorization': `Bearer ${getToken()}`
                    },
                    params:{
                      "fecha_fin": fechaFin,
                      "fecha_inicio": fechaIni
                    }
                }
            )
            .then((Response) => {
                setTabla(Response.data.Asistencia);
                //console.log(Response)
            })
            .catch((e) => {
                if(e.response.status === 403){
                  console.log("No tienes permisos para ver esta información");
                }else{
                }
                console.log(e.response)
            });
            // setLoading(false);
    }

    useEffect(() => {
      peticionTablaDia();
      cambiarEstado();
  }, [])

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
    const condEst={Activo:'Activo',Retirado:'Retirado'};
  //

  const [loading, setLoading] = useState(false);

  const cambiarEstado=()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

    const [selectedRow, setSelectedRow] = useState(null);
    if (loading) {
      return (<Loading />)
    }else{
  return (
    <div className="main">
      <div>
        <div className="flex items-center">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            </div>
            <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fecha Inicio" value={fechaIni}
                        onChange={(e)=>setFechaIni(e.target.value)}/>
          </div>
          <span className="mx-4 text-gray-500">Hasta</span>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            </div>
            <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fecha Fin" value={fechaFin}
                        onChange={(e)=>setFechaFin(e.target.value)}/>
          </div>
          <button className="mx-4 text-gray-500" onClick={peticionFiltroFecha} >Buscar</button>
          <button className="mx-4 text-gray-500" onClick={() => {setFiltering(currentFilter => !currentFilter)}}>Filtros personalizados</button>
        </div>
      </div>
      <br/>      
        <MaterialTable
          columns={[
            {title: 'Fecha',field: 'Fecha',filtering: false},
            {title: 'Hora',field: 'Hora',filtering: false},
            {title: 'Dni',field: 'Dni',filtering: false},
            {title: 'Nombres',field: 'Nombres',filtering: false},
            {title: 'Sistema Operativo',field: 'Sistema Operativo',filtering: false},
            {title: 'Dispositivo',field: 'Dispositivo',filtering: false},
            {title: 'Perfil',field: 'Perfil',lookup:resultArea2},
            {title: 'Departamento',field: 'Unidad',lookup:resultUnidad2},
            {title: 'Estado',field: 'Estado',lookup:condEst},
            {title: 'Turno',field: 'Turno',lookup:turnos},
        ]}
          data={data}

          onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{

            headerStyle: {
              backgroundColor: '#E2E2E2  ',
            },
            rowStyle: rowData => ({
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            }),
            searchFieldAlignment: 'left',
            showTitle: false,
            exportButton: true,
            actionsColumnIndex: -1,
            filtering,
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
                showColumnsTitle: 'Ver columnas',
                showColumnsAriaLabel: 'Ver columnas',
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
export default ReporteAsistencia;