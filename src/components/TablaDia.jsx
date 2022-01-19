import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { setToken, getToken } from "../dist/Token";
import Loading from "../components/Loading.jsx";

function TablaDia() {
  const [filtering, setFiltering] = React.useState(false);
  const [data, setTabla] = useState([]);
  // const [loading, setLoading] = useState(false);
  //filtros tabla
  const [selectArea, setSelectArea] = useState([]);
  const [selectUnidad, setUnidad] = useState([]);

  const peticionTablaDia = async () => {
    // setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/tablas_administrador`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((Response) => {
        setLoading(false);
        setTabla(Response.data.AsistenciaEmpleadosDiario);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          console.log("No tienes permisos para ver esta información");
        } else {
        }
      });
    // setLoading(false);
  };
  useEffect(() => {
    peticionTablaDia();
  }, []);

  //filtros tabla
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setUnidad(response.data.Unidades);
        //console.log(response)
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/areas`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setSelectArea(response.data.Areas);
        //console.log(response)
      })
      .catch((error) => {});
  }, []);

  let resultArea = selectArea.map(function (item) {
    return `"${item}":"${item}"`;
  });
  let resultArea2 = JSON.parse(`{${resultArea}}`);

  let resultUnidad = selectUnidad.map(function (item) {
    return `"${item}":"${item}"`;
  });
  let resultUnidad2 = JSON.parse(`{${resultUnidad}}`);
  const turnos = {
    Mañana: "Mañana",
    Tarde: "Tarde",
    ["Mañana y tarde"]: "Mañana y Tarde",
  };
  const condEst = { Activo: "Activo", Retirado: "Retirado" };
  const dispositivos = {
    Computadora: "Computadora",
    Tablet: "Tablet",
    Celular: "Celular",
  };
  const sis_operativo = {
    ["Windows 10"]: "Windows 10",
    ["Windows 8.1"]: "Windows 8.1",
    ["Windows 8"]: "Windows 8",
    ["Windows 7"]: "Windows 7",
    ["Windows Vista"]: "Windows Vista",
    ["Windows XP"]: "Windows XP",
    ["Windows 2003"]: "Windows 2003",
    Windows: "Windows",
    iPhone: "iPhone",
    iPad: "iPad",
    ["Mac OS X"]: "Mac OS X",
    ["Mac otros"]: "Mac otros",
    Android: "Android",
    Blackberry: "Blackberry",
    Linux: "Linux",
  };

  //

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div className="flex justify-center align-center"><Loading /></div>
  } else {
    return (
      <div className="main">
        <MaterialTable
          columns={[
            { title: "Fecha", field: "Fecha", filtering: false },
            { title: "Hora", field: "Hora", filtering: false },
            { title: "DNI", field: "Dni", filtering: false },
            { title: "Nombres", field: "Nombres", filtering: false },
            {
              title: "Sistema Operativo",
              field: "Sistema Operativo",
              lookup: sis_operativo,
            },
            {
              title: "Dispositivo",
              field: "Dispositivo",
              lookup: dispositivos,
            },
            { title: "Perfil", field: "Perfil", lookup: resultArea2 },
            { title: "Departamento", field: "Unidad", lookup: resultUnidad2 },
            { title: "Estado", field: "Estado", lookup: condEst },
            { title: "Turno", field: "Turno", lookup: turnos },
          ]}
          data={data}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },

            searchFieldAlignment: "left",
            showTitle: false,
            exportButton: {
              csv: true,
              pdf: true,
            },
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

export default TablaDia;
