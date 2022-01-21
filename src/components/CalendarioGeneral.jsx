import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { getToken } from "../dist/Token";
import Loading from "../components/Loading.jsx";

function CalendarioGeneral({ dniCalendario }) {
  const [data, setTabla] = useState([]);

  const peticionTablaFeriados = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/calendario/${dniCalendario}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setTabla(response.data.CalendarioAsistencia);
      })
      .catch((e) => {
        setTabla([]);
      });
    // setLoading(false);
  };

  useEffect(() => {
    peticionTablaFeriados();
    cambiarEstado();
  }, [dniCalendario]);

  const [loading, setLoading] = useState(false);

  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="main mt-3">
        <MaterialTable
          columns={[
            { title: "Fecha", field: "start", align: "center" },
            { title: "Asistencia", field: "title", align: "center" },
          ]}
          data={data}
          options={{
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },

            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: true,
            exportAllData: true,
            exportFileName: "Tabla de Asistencia del Empleado",
            actionsColumnIndex: -1,
            // rowStyle: {
            //   backgroundColor: '#EEE',
            // }
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "No hay registro para mostrar",
              addTooltip: "Agregar",
              deleteTooltip: "Eliminar",
              editTooltip: "Editar",
              filterRow: {
                filterTooltip: "Filtrar",
              },
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} de {count}",
              labelRowsSelect: "filas",
              labelRowsPerPage: "filas por página:",
              firstAriaLabel: "Primera página",
              firstTooltip: "Primera página",
              previousAriaLabel: "Página anterior",
              previousTooltip: "Página anterior",
              nextAriaLabel: "Página siguiente",
              nextTooltip: "Página siguiente",
              lastAriaLabel: "Última página",
              lastTooltip: "Última página",
            },
            toolbar: {
              nRowsSelected: "{0} ligne(s) sélectionée(s)",
              showColumnsTitle: "Ver columnas",
              showColumnsAriaLabel: "Ver columnas",
              exportTitle: "Exportar",
              exportAriaLabel: "Exportar",
              exportCSVName: "Exportar en formato CSV",
              exportPDFName: "Exportar como PDF",
              searchTooltip: "Buscar",
              searchPlaceholder: "Buscar",
            },
          }}
        />
      </div>
    );
  }
}

export default CalendarioGeneral;
