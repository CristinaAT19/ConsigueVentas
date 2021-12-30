import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import { setToken, getToken } from "../dist/Token";
import Loading from "../components/Loading.jsx";

function CalendarioGeneral({dniCalendario}) {
    
    const [data, setTabla] = useState([]);
    //const [valor, setValor] = useState([]);
    // console.log(valor);
    // const [loading, setLoading] = useState(false);
    const peticionTablaDia = async () => {
      // setLoading(true);
         await axios.get(`${process.env.REACT_APP_API_URL}/api/calendario/${dniCalendario}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                setTabla(response.data.CalendarioAsistencia);
            }).catch((e) => {
                setTabla([]);
            });
            // setLoading(false);
    }
    
    useEffect(() => {
      peticionTablaDia();
      cambiarEstado();
  }, [dniCalendario])

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
    <div className="main mt-3">
        <MaterialTable
          columns={[
            {title: 'Fecha',field: 'start',align: 'center',},
            {title: 'Asistencia',field: 'title',align: 'center',}
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

export default CalendarioGeneral;
