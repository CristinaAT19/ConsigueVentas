import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import {
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../components/Loading";
import { setToken, getToken } from "../dist/Token";
// import { Component } from 'react'
//import Select from 'react-select'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "21rem",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "20%",
  },
}));

const baseUrl = `${process.env.REACT_APP_API_URL}/api/`;

function TablaFeriados() {
  const [loading, setLoading] = useState(false);
  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    Fecha: "",
    ["Dia Festivo"]: "",
  });

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl + "listarFeriados", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setData(response.data.Feriados);
      })
      .catch((error) => {});
  };

  const peticionPut = async () => {
    await axios
      .post(
        baseUrl + "tabla_faltas/" + empleadoSeleccionado.Id,
        {
          cambio_estado: empleadoSeleccionado["Estado Falta"],
        },

        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        setData(data);
        peticionGet();
        abrirCerrarModalEditar();
      })
      .catch((error) => {});
  };

  useEffect(() => {
    cambiarEstado();
    peticionGet();
  }, []);

  const seleccionarEmpleado = (empleado, caso) => {
    let empleadoEdit = { ...empleado };
    empleadoEdit["Estado Falta"] === "Falta Justificada"
      ? (empleadoEdit["Estado Falta"] = 3)
      : (empleadoEdit["Estado Falta"] = 4);
    setEmpleadoSeleccionado(empleadoEdit);

    caso === "Editar" && abrirCerrarModalEditar();
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const optiones = [
    { value: 3, label: "Falta Justificada" },
    { value: 4, label: "Falta Injustificada" },
  ];

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Feriado</h3>
      <br />
      <Input
        type="date"
        style={{ width: "99%" }}
        onChange={handleChangeEdit}
        id="Fecha Feriado"
        name="Fecha Feriado"
        label="Fecha Feriado"
        value={empleadoSeleccionado && empleadoSeleccionado["Estado Falta"]}
        defaultMenuIsOpen={false}
        isSearchable={false}
      ></Input>
      <TextField
        type="text"
        style={{ width: "99%" }}
        onChange={handleChangeEdit}
        id="Fecha Feriado"
        name="Fecha Feriado"
        label="Fecha Feriado"
        value={empleadoSeleccionado && empleadoSeleccionado["Estado Falta"]}
        defaultMenuIsOpen={false}
        isSearchable={false}
      ></TextField>
      {/* <TextField className={styles.inputMaterial} label="Estado Falta" name="Estado Falta" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado['Estado Falta']} /> */}
      <br />
      <br />
      <div align="right">
        <button
          onClick={() => peticionPut()}
          className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
        >
          EDITAR
        </button>
        <button
          onClick={() => abrirCerrarModalEditar()}
          className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          CANCELAR
        </button>
      </div>
    </div>
  );
  // const tableRef = React.createRef();
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="my-4">
          <p>En esta seccion puede insertar los dias feriados.</p>
          <TextField
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            className={styles.inputMaterial}
            label="Fecha"
            name="Fecha"
            onChange={handleChangeEdit}
            value={
              empleadoSeleccionado &&
              empleadoSeleccionado["Fecha inicio prueba"]
            }
          />
          <br />
          <TextField
            className={styles.inputMaterial}
            label="Dia Festivo"
            name="DiaFestivo"
            value={empleadoSeleccionado && empleadoSeleccionado["Nombres"]}
          />
          <br />
          <br />
          <button
            className=" bg-gray-700 text-gray-50 h-1/5 py-2 hover:bg-naranja rounded-md"
            style={{ width: "6rem" }}
          >
            Insertar
          </button>
        </div>
        <MaterialTable
          columns={[
            {
              title: "Dia Festivo",
              field: "fer_detalleCalendario",
              sortable: true,
              filtering: false,
              align: "center",
            },
            {
              title: "Fecha",
              field: "fer_fechaCalendario",
              filtering: false,
              align: "center",
            },
            {
              title: "Tipo Feriado",
              field: "fer_tipoFeriado",
              sortable: true,
              filtering: false,
              align: "center",
            },
          ]}
          data={data}
          title="Tabla de dias feriados"
          // tableRef={tableRef}
          actions={[
            {
              icon: "edit",
              tooltip: "Editar",
              onClick: (event, rowData) =>
                seleccionarEmpleado(rowData, "Editar"),
            },
            {
              icon: "delete",
              tooltip: "Eliminar",
              onClick: (event, rowData) =>
                seleccionarEmpleado(rowData, "Eliminar"),
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#E2E2E2  ",
            },
            exportButton: true,
            actionsColumnIndex: -1,
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
              labelRowsPerPage: "filas por pagina:",
              firstAriaLabel: "Primera pagina",
              firstTooltip: "Primera pagina",
              previousAriaLabel: "Pagina anterior",
              previousTooltip: "Pagina anterior",
              nextAriaLabel: "Pagina siguiente",
              nextTooltip: "Pagina siguiente",
              lastAriaLabel: "Ultima pagina",
              lastTooltip: "Ultima pagina",
            },
            toolbar: {
              nRowsSelected: "{0} ligne(s) sélectionée(s)",
              // showColumnsTitle: 'Voir les colonnes',
              // showColumnsAriaLabel: 'Voir les colonnes',
              exportTitle: "Exportar",
              exportAriaLabel: "Exportar",
              exportCSVName: "Exportar en formato CSV",
              exportPDFName: "Exportar como PDF",
              searchTooltip: "Buscar",
              searchPlaceholder: "Buscar",
            },
            header: {
              actions: "Acciones",
            },
          }}
        />

        <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>
      </div>
    );
  }
}
export default TablaFeriados;
