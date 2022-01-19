import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
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
  const [fechaIni, setFechaIni] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [valor, setValor] = useState("");

  const [loading, setLoading] = useState(true);
  const dateFormat = "YYYY/MM/DD";

  function handlePicker(fieldsValue) {
    if (fieldsValue) {
      const a = moment(fieldsValue[0]._d).format(dateFormat);
      setFechaIni(a);

      const b = moment(fieldsValue[1]._d).format(dateFormat);

      setFechaFin(b);
    }
  }

  const peticionTablaDia = async () => {
    // setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/asistenciaTotal`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((Response) => {
        setLoading(false);
        setTabla(Response.data.Asistencias);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          console.log("No tienes permisos para ver esta información");
        } else {
        }
      });
    // setLoading(false);
  };
  //filtros fecha
  const peticionFiltroFecha = async () => {
    // setLoading(true);
    await axios
      .get(
        // `${process.env.REACT_APP_API_URL}/api/asistenciaTotal`,
        `${process.env.REACT_APP_API_URL}/api/filtradoFecha`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          params: {
            fecha_fin: fechaFin,
            fecha_inicio: fechaIni,
          },
        }
      )
      .then((Response) => {
        setTabla(Response.data.Asistencia);
        setValor("");
        //console.log(Response)
      })
      .catch((e) => {
        if (e.response.status === 403) {
          console.log("No tienes permisos para ver esta información");
        } else if (e.response.status === 422) {
          setValor("Llenar campos de fecha");
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

  if (loading) {
    return (
      <div className="flex justify-center align-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="main">
        <div>
          <h1 style={{ fontSize: "1.2rem" }}>Filtrar por fecha:</h1>
          <RangePicker
            onChange={handlePicker}
            placeholder={["Inicio", "Fin"]}
            onOpenChange={() => {
              setValor("");
            }}
          />

          <button
            className="btn btn btn-warning mx-2 "
            onClick={peticionFiltroFecha}
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
              style={{ width: "0.8rem", height: "0.8rem" }}
            />
          </button>
        </div>
        <button
          className="mx-2 text-gray-500"
          onClick={() => {
            setFiltering((currentFilter) => !currentFilter);
          }}
        >
          Filtrado personalizado
        </button>

        <br />
        <p className="text-danger"> {valor} </p>
        <br />
        <div className="m-2 transition-all" title="Limpiar datos">
          {
            <button
              onClick={peticionTablaDia}
              className=" flex items-center justify-center p-2 bg-yellow-500 h-8 border-solid border-2 border-black rounded-md"
            >
              Mostrar todas las asistencias
            </button>
          }
        </div>
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
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },

            searchFieldAlignment: "left",
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
export default ReporteAsistencia;
