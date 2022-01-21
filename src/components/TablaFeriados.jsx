import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Error from "../components/item/Error";
import {
  Modal,
  TextField,
  Select,
  MenuItem,
  Input,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../components/Loading";
import { setToken, getToken } from "../dist/Token";
import { validationRequired } from "../helpers/validaciones";
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
    width: "300px",
  },
}));

const baseUrl = `${process.env.REACT_APP_API_URL}/api/`;

function TablaFeriados() {
  const [loading, setLoading] = useState(true);

  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [error, setError] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({});
  const [sucess, setSucess] = useState(false);

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
        setLoading(false);
        setData(response.data.Feriados);
      })
      .catch((error) => {});
  };

  const peticionPut = async () => {
    let erroresEncontrados = false;
    setError({});
    // Validacion de requerido
    if (!validationRequired(empleadoSeleccionado["fer_fechaCalendario"])) {
      setError({ ...error, fecha_feriado_edit: "Este campo es requerido" });
      erroresEncontrados = true;
    }
    if (!validationRequired(empleadoSeleccionado["fer_detalleCalendario"])) {
      setError({ ...error, dia_feriado_edit: "Este campo es requerido" });
      erroresEncontrados = true;
    }
    if (!validationRequired(empleadoSeleccionado["fer_tipoFeriado"])) {
      setError({ ...error, tipo_feriado_edit: "Este campo es requerido" });
      erroresEncontrados = true;
    }
    if (erroresEncontrados) {
      return;
    }

    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/feriados`,
        {
          fecha_feriado: empleadoSeleccionado["fer_fechaCalendario"],
          dia_feriado: empleadoSeleccionado["fer_detalleCalendario"],
          tipo_feriado: empleadoSeleccionado["fer_tipoFeriado"],
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setData(data);
        setError([]);
        peticionGet();
        abrirCerrarModalEditar();
      })
      .catch((e) => {
        setLoading(false);
        if (e.response.status === 422) {
          setError({
            dia_feriado_edit: e.response.data.errors.dia_feriado,
            fecha_feriado_edit: e.response.data.errors.fecha_feriado,
            tipo_feriado_edit: e.response.data.errors.tipo_feriado,
          });
        } else {
          setError({
            tipo_feriado_edit: e.response.data.errors.msg,
          });
        }
      });
    setLoading(false);
  };

  const peticionDelete = async () => {
    setError([]);
    setLoading(true);
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/feriados`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          fecha_feriado: empleadoSeleccionado["fer_fechaCalendario"],
        },
      })
      .then((response) => {
        setLoading(false);
        setError([]);
        peticionGet();
        abrirCerrarModalEliminar();
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.response);
        if (e.response.status === 422) {
          // setError(e.response.data.errors);
        } else {
          setError(["Error no encontrado"]);
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const seleccionarEmpleado = (empleado, caso) => {
    let empleadoEdit = { ...empleado };
    empleadoEdit["Estado Falta"] === "Falta Justificada"
      ? (empleadoEdit["Estado Falta"] = 3)
      : (empleadoEdit["Estado Falta"] = 4);
    setEmpleadoSeleccionado(empleadoEdit);
    caso === "Editar" && abrirCerrarModalEditar();
    caso === "Eliminar" && abrirCerrarModalEliminar();
  };

  const abrirCerrarModalEditar = () => {
    setError([]);
    setModalEditar(!modalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const optiones = [
    { value: 3, label: "Falta Justificada" },
    { value: 4, label: "Falta Injustificada" },
  ];

  // Para insertar empleado

  const manejadorInsertar = async (e) => {
    e.preventDefault();
    const form = e.target.elements;
    let erroresEncontrados = false;
    setError({});
    // Validacion de requerido
    if (!validationRequired(form.DiaFestivo.value)) {
      setError({ ...error, dia_feriado: "Este campo es requerido" });
      erroresEncontrados = true;
    }
    if (erroresEncontrados) {
      return;
    }

    setLoading(true);
    // Validacion de requerido

    const nuevoFeriado = {
      fecha_feriado: form.Fecha.value,
      dia_feriado: form.DiaFestivo.value,
      tipo_feriado: form.TipoFeriado.value,
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/insertarFeriados`,
        nuevoFeriado,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((Response) => {
        setSucess(true);
        setError([]);
        peticionGet();
      })
      .catch((e) => {
        setSucess(false);
        setLoading(false);
        if (e.response.status === 422) {
          setError(e.response.data.errors);
        } else {
          console.log(e.response.data.msg);
          setError({ fecha_feriado: e.response.data.msg });
        }
      });
    setLoading(false);
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Feriado</h3>
      <br />
      <Input
        disabled
        type="date"
        style={{ width: "99%" }}
        onChange={handleChangeEdit}
        id="Fecha Feriado"
        name="fer_fechaCalendario"
        label="Fecha Feriado"
        value={
          empleadoSeleccionado && empleadoSeleccionado["fer_fechaCalendario"]
        }
        defaultMenuIsOpen={false}
        isSearchable={false}
      ></Input>
      <Error errors={error["fecha_feriado_edit"]}></Error>

      <TextField
        type="text"
        style={{ width: "99%" }}
        onChange={handleChangeEdit}
        id="Fecha Feriado"
        name="fer_detalleCalendario"
        label="Dia festivo"
        value={
          empleadoSeleccionado && empleadoSeleccionado["fer_detalleCalendario"]
        }
        defaultMenuIsOpen={false}
        isSearchable={false}
      ></TextField>
      <Error errors={error["dia_feriado_edit"]}></Error>

      <FormControl fullWidth>
        <InputLabel id="turno">Tipo de Feriado</InputLabel>
        <Select
          labelId="turno"
          id="turno"
          name="fer_tipoFeriado"
          label="Turno"
          onChange={handleChangeEdit}
          value={
            empleadoSeleccionado && empleadoSeleccionado["fer_tipoFeriado"]
          }
        >
          <MenuItem value={"C"}>Calendario</MenuItem>
          <MenuItem value={"N"}>No calendario</MenuItem>
        </Select>
        <Error errors={error["tipo_feriado_edit"]}></Error>
      </FormControl>
      <br />
      <br />
      <div align="right">
        {loading ? (
          <Loading />
        ) : (
          <button
            onClick={() => peticionPut()}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            EDITAR
          </button>
        )}
        <button
          onClick={() => abrirCerrarModalEditar()}
          className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          CANCELAR
        </button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <h3>Eliminar feriado</h3>
      <br />
      <p>
        Eliminaras el feriado{" "}
        <strong>{empleadoSeleccionado["fer_detalleCalendario"]}</strong> con
        fecha de <strong>{empleadoSeleccionado["fer_fechaCalendario"]} </strong>
      </p>
      <br />
      <div align="right">
        {loading ? (
          <Loading />
        ) : (
          <button
            onClick={() => peticionDelete()}
            className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
          >
            Eliminar
          </button>
        )}
        <button
          onClick={() => abrirCerrarModalEliminar()}
          className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
        >
          CANCELAR
        </button>
      </div>
    </div>
  );
  // Para podeer insertar dias feriados
  if (loading) {
    return (
      <div className="flex justify-center align-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={manejadorInsertar}>
          <div className="my-4">
            <p>En esta sección puede insertar los días feriados.</p>
            {sucess ? (
              <p className="text-green-500">Feriado insertado con éxito</p>
            ) : null}
            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha"
              name="Fecha"
            />
            <Error errors={error["fecha_feriado"]}></Error>
            <TextField
              className={styles.inputMaterial}
              label="Día Festivo"
              name="DiaFestivo"
            />
            <Error errors={error["dia_feriado"]}></Error>

            <FormControl className={styles.inputMaterial}>
              <InputLabel id="TipoFeriado">Tipo de Feriado</InputLabel>
              <Select
                labelId="TipoFeriado"
                id="TipoFeriado"
                name="TipoFeriado"
                label="TipoFeriado"
              >
                <MenuItem value={"C"}>Calendario</MenuItem>
                <MenuItem value={"N"}>No calendario</MenuItem>
              </Select>
              <Error errors={error["tipo_feriado"]}></Error>
            </FormControl>

            <br />
            <br />

            <button
              className=" bg-gray-700 text-gray-50 h-1/5 py-2 hover:bg-naranja rounded-md"
              style={{ width: "6rem" }}
              type="submit"
            >
              Insertar
            </button>
          </div>
        </form>
        <MaterialTable
          columns={[
            {
              title: "Día Festivo",
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
              lookup: { C: "Calendario", N: "No Calendario" },
            },
          ]}
          data={data}
          title="Tabla de días feriados"
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
            exportAllData: true,
            exportFileName: "Tabla de Feriados",
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
        <Modal animation={"false"} open={modalEditar}>
          {bodyEditar}
        </Modal>
        <Modal animation={"false"} open={modalEliminar}>
          {bodyEliminar}
        </Modal>
      </div>
    );
  }
}
export default TablaFeriados;