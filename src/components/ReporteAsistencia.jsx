import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Loading from "../components/Loading";
import { getToken } from "../dist/Token";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;



function ReporteAsistencia() {
    const [filtering, setFiltering] = useState(false);
    const [data, setTabla] = useState([]);
    // const [loading, setLoading] = useState(false);
    //filtros tabla
    const [selectArea, setSelectArea] = useState([]);
    const [selectUnidad, setUnidad] = useState([]);
    const [fechaIni,setFechaIni]=useState('');
    const [fechaFin,setFechaFin]=useState('');
    const [valor, setValor] = useState("");

    
    const dateFormat = "YYYY/MM/DD";

    function handlePicker(fieldsValue) {
      if(fieldsValue){
        const a = moment(fieldsValue[0]._d).format(dateFormat);
        setFechaIni(a);
        console.log(a);
        const b = moment(fieldsValue[1]._d).format(dateFormat);
        console.log(b);
        setFechaFin(b);
      }
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
                setValor("");
                //console.log(Response)
            })
            .catch((e) => {
                if(e.response.status === 403){
                  console.log("No tienes permisos para ver esta información");
                }else if(e.response.status === 422){
                  setValor("Llenar campos de fecha");
                }
                
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
      <RangePicker onChange={handlePicker} placeholder={["Inicio","Fin"]} onOpenChange={()=>{setValor("")}} />
      <button className="px-4" onClick={peticionFiltroFecha}>Buscar</button>
      <button className="mx-4 text-gray-500" onClick={() => {setFiltering(currentFilter => !currentFilter)}}>Filtros personalizados</button>
      </div>
      <br/> 
      <p className='text-danger'> {valor} </p>
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