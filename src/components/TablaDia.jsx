import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from 'material-table';
import { setToken, getToken } from "../dist/Token";
import Loading from "../components/Loading.jsx";





function TablaDia() {
    const [data, setTabla] = useState([]);
    // const [loading, setLoading] = useState(false);
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
                setTabla(Response.data.AsistenciaEmpleadosDiario);
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
      peticionTablaDia();
      cambiarEstado();
  }, [])
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
        <MaterialTable
          columns={[
            {title: 'Fecha',field: 'Fecha'},
            {title: 'Hora',field: 'Hora'},
            {title: 'Dni',field: 'Dni'},
            {title: 'Nombres',field: 'Nombres'},
            {title: 'Sistema Operativo',field: 'Sistema Operativo'},
            {title: 'Dispositivo',field: 'Dispositivo'},
            {title: 'Perfil',field: 'Perfil'},
            {title: 'Departamento',field: 'Unidad'},
            {title: 'Estado',field: 'Estado'},
            {title: 'Turno',field: 'Turno'},
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

export default TablaDia;
