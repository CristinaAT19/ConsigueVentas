import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import {
  Modal,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { setToken, getToken } from "../dist/Token";
import Error from "../components/item/Error";
import Loading from "../components/Loading";
//import Success from './item/Sucess';
import {
  calcularEdad,
  calcularDiferenciaDias,
  calcularDiferenciaDiasFechaActual,
} from "../helpers/fecha";
import { validationOnlyNumbers } from "../helpers/validaciones";
import {
  getPeticionPerfilId,
  getPeticionPerfiles,
  getPeticionUnidades,
  getPeticionMarcas,
  getPeticionAreasEmpleado,
} from "../dist/getPeticiones";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    overflow: "scroll",
    overflowX: "hidden",
    width: "80%",
    height: "95%",
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
    width: "100%",
  },
}));

function TablaEmpleados() {
  // Estilos
  const styles = useStyles();

  // Modales
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  // Entidades
  const [empleado, setEmpleado] = useState({
    perfil: "",
    area: "",
    subarea: "",
  });
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    Id: "",
    Apellidos: "",
    Nombres: "",
  });

  // Utilidades
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  //  const [sucess, setSucess] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState([]);
  const [selectArea, setSelectArea] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [selectUnidad, setUnidad] = useState([]);
  /////
  const [perfiles, setPerfiles] = useState([]);
  const [perfilesTabla, setPerfilesTabla] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [areasEmp, setAreasEmp] = useState([]);
  const [areasTabla, setAreasTabla] = useState([]);
  //////
  const [selectMarca, setSelectMarca] = useState([]);
  const [selectPerfil, setSelectPerfil] = useState([]);
  const [selectSubarea, setSelectSubarea] = useState([]);

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
      })
      .catch((error) => {});
    getPeticionPerfiles(setPerfiles, setLoading, setPerfilesTabla);
    getPeticionUnidades(setUnidades, setLoading);
    getPeticionMarcas(setMarcas, setLoading);
    getPeticionAreasEmpleado(setAreasEmp, setLoading, setAreasTabla);
  }, []);

  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/marcas`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setSelectMarca(response.data.Marcas);
        //console.log(response)
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/perfiles`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setSelectPerfil(response.data.Perfiles);
        //console.log(response)
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/subareas`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setSelectSubarea(response.data.Subareas);
        //console.log(response)
      })
      .catch((error) => {});
  }, []);

  //Array Filtros Tabla
  let resultArea = selectArea.map(function (item) {
    return `"${item}":"${item}"`;
  });
  let resultArea2 = JSON.parse(`{${resultArea}}`);

  let resultUnidad = selectUnidad.map(function (item) {
    return `"${item}":"${item}"`;
  });
  let resultUnidad2 = JSON.parse(`{${resultUnidad}}`);

  let resultMarca = selectMarca.map(function (item) {
    return `"${item}":"${item}"`;
  });
  let resultMarca2 = JSON.parse(`{${resultMarca}}`);

  let resultPerfil = selectPerfil.map(function (item) {
    return `"${item}":"${item}"`;
  });
  let resultPerfil2 = JSON.parse(`{${resultPerfil}}`);

  let resultSubarea = selectSubarea.map(function (item) {
    return `"${item}":"${item}"`;
  });
  let resultSubarea2 = JSON.parse(`{${resultSubarea}}`);
  const condCapa = {
    "Terminó capacitación": "Terminó capacitación",
    "No terminó capacitación": "No terminó capacitación",
    "En proceso": "En proceso",
  };
  const condConv = {
    Firmado: "Firmado",
    "Enviado para firmar": "Enviado para firmar",
    "No firmado": "No firmado",
    "Terminó convenio": "Terminó convenio",
    "En proceso": "En proceso",
    Retirado: "Retirado",
  };
  const turnos = {
    Mañana: "Mañana",
    Tarde: "Tarde",
    ["Mañana y tarde"]: "Mañana y Tarde",
  };
  const condEst = { Activo: "Activo", Retirado: "Retirado" };
  const tipColab = {
    Apoyo: "Apoyo",
    Colaborador: "Colaborador",
    Practicante: "Practicante",
  };
  const condPrac = {
    Retirado: "Retirado",
    Ingresante: "Activo",
    "En proceso": "En proceso",
    "Terminó Practicas": "Terminó Practicas",
  };
  //
  const { perfil, area, subarea } = empleado;
  const peticionGet = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/listarEmpleados`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setData(response.data.empleados);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    peticionGet();
  }, []);
  ///////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "perfil") {
      getPeticionPerfilId(setEmpleado, value);
    }
  };
  //////////////////////
  // Actualizar empleado
  const actualizarEmpleado = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Validaciones de frontend

    const form = e.target.elements;
    const edad = calcularEdad(form["Fecha Nacimiento"].value);
    const diffDiasPrueba = calcularDiferenciaDias(
      form["Fecha inicio prueba"].value,
      form["Fecha fin prueba"].value
    );
    // const diffDiasActual = calcularDiferenciaDiasFechaActual(form['Fecha baja'].value);
    // if(empleadoSeleccionado['Fecha baja'] != form['Fecha baja'].value){
    //   // Validacion de bajada
    //   if (diffDiasActual < 0 || isNaN(diffDiasActual)) {
    //     const errorVal = {
    //       "emp_fechabaja": "Fecha tiene que mayor a 0. ",
    //     }
    //     setLoading(false);
    //     setErrorUpdate(errorVal);
    //     return;
    //   }
    // }

    // Validacion inicio prueba, fin prueba
    if (diffDiasPrueba < 2 || isNaN(diffDiasPrueba)) {
      const errorVal = {
        emp_Fec_fin_prueba: "La diferencia de días tiene que ser mayor a 2",
      };
      setErrorUpdate(errorVal);
      setLoading(false);
      return;
    }

    // Validacion edad
    if (edad < 18 || isNaN(edad)) {
      const errorVal = {
        emp_fechanac: "Debe ser mayor de edad. ",
      };

      setLoading(false);
      setErrorUpdate(errorVal);
      return;
    }
    // Validacion numerico
    if (validationOnlyNumbers(form["Dni"].value) === false) {
      const errorVal = {
        emp_dni: "Solo se permiten números",
      };
      setLoading(false);
      setErrorUpdate(errorVal);
      return;
    }

    if (validationOnlyNumbers(form["Telefono"].value) === false) {
      const errorVal = {
        emp_telefono: "Solo se permiten números",
      };
      setLoading(false);
      setErrorUpdate(errorVal);
      return;
    }

    if (validationOnlyNumbers(form["Días extra"].value) === false) {
      const errorVal = {
        emp_dias_extra: "Solo se permiten números",
      };
      setLoading(false);
      setErrorUpdate(errorVal);
      return;
    }

    setError([]);

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/actualizarEmpleado/${empleadoSeleccionado["Id"]}`,
        {
          emp_nombre: empleadoSeleccionado["Nombres"],
          emp_apellido: empleadoSeleccionado["Apellidos"],
          emp_fechabaja: empleadoSeleccionado["Fecha baja"],
          emp_fec_inicio_prueba: empleadoSeleccionado["Fecha inicio prueba"],
          emp_Fec_fin_prueba: empleadoSeleccionado["Fecha fin prueba"],
          emp_TurnoId: empleadoSeleccionado["Turno"],
          Emp_Area_Id: empleadoSeleccionado["Area"],
          emp_dni: empleadoSeleccionado["Dni"],
          emp_carrera: empleadoSeleccionado["Carrera"],
          emp_email: empleadoSeleccionado["Correo"],
          emp_telefono: empleadoSeleccionado["Telefono"],
          emp_link_cv: empleadoSeleccionado["Link CV"],
          ////
          Emp_Perfiles_Id: empleadoSeleccionado["Perfil"],
          Emp_Unidad_Id_fk: empleadoSeleccionado["Departamento"],
          Emp_Marca_Id_fk: empleadoSeleccionado["Marca"],
          ////
          // Emp_Id_Condicion_capacitacion_fk:
          //   empleadoSeleccionado["Condicion Capacitación"],
          emp_link_calificaciones: empleadoSeleccionado["Link Calificaciones"],
          Emp_Id_Convenio_fk: empleadoSeleccionado["Convenio"],
          emp_link_convenio: empleadoSeleccionado["Link Convenio"],
          emp_fechanac: empleadoSeleccionado["Fecha Nacimiento"],
          emp_dias_extra: empleadoSeleccionado["Días extra"],
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setErrorUpdate([]);
        peticionGet();
        abrircerrarModalEditar();
      })
      .catch((error) => {
        setLoading(false);
        setErrorUpdate(error.response.data.errors);
      });
  };

  const abrircerrarModalInsertar = () => {
    setError([]);
    setModalInsertar(!modalInsertar);
  };

  const abrircerrarModalEditar = () => {
    setErrorUpdate([]);
    setModalEditar(!modalEditar);
  };
  const abrircerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarEmpleado = (empleado, caso) => {
    // Formateo de 'select' turno

    //Cambio de else if a Switch

    let empleadoFormateado = { ...empleado };
    //Formato de departamento
    unidades.forEach((el, i) => {
      if (empleadoFormateado.Departamento === el)
        empleadoFormateado.Departamento = i + 1;
    });
    //Formato de Perfiles

    perfiles.forEach((el, i) => {
      if (empleadoFormateado.Perfil === el.perfil_nombre)
        empleadoFormateado.Perfil = el.perfil_Id;
    });
    //Formato Marcas
    marcas.forEach((el, i) => {
      if (empleadoFormateado.Marca === el) empleadoFormateado.Marca = i + 1;
    });
    //Formato Areas
    selectArea.forEach((el, i) => {
      if (empleadoFormateado.Area === el) empleadoFormateado.Area = i + 1;
    });
    //Formato Turno
    switch (empleadoFormateado.Turno) {
      case "Mañana":
        empleadoFormateado.Turno = 1;
        break;
      case "Tarde":
        empleadoFormateado.Turno = 2;
        break;
      case "Mañana y tarde":
        empleadoFormateado.Turno = 3;
        break;
    }

    // Formateo de 'select' condicion capacitacion

    switch (empleadoFormateado["Condicion Capacitación"]) {
      case "Terminó capacitación":
        empleadoFormateado["Condicion Capacitación"] = 1;
        break;
      case "No terminó capacitación":
        empleadoFormateado["Condicion Capacitación"] = 2;
        break;

      case "En proceso":
        empleadoFormateado["Condicion Capacitación"] = 3;
        break;
    }

    // Formateo de 'select' convenio

    switch (empleadoFormateado["Convenio"]) {
      case "Firmado":
        empleadoFormateado["Convenio"] = 1;
        break;
      case "Enviado para firmar":
        empleadoFormateado["Convenio"] = 2;
        break;
      case "No firmado":
        empleadoFormateado["Convenio"] = 3;
        break;
      case "Terminó convenio":
        empleadoFormateado["Convenio"] = 4;
        break;
      case "En proceso":
        empleadoFormateado["Convenio"] = 5;
        break;
      case "Retirado":
        empleadoFormateado["Convenio"] = 6;
        break;
    }

    setEmpleadoSeleccionado(empleadoFormateado);
    caso === "Editar" ? abrircerrarModalEditar() : abrircerrarModalEliminar();
  };

  //
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Insertar nuevo empleado
  const manejadorInsertar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target.elements;
    const edad = calcularEdad(form.FechaNacimiento.value);
    const diffDiasPrueba = calcularDiferenciaDias(
      form.FechaInicioPrueba.value,
      form.FechaFinPrueba.value
    );
    // const diffDiasActual = calcularDiferenciaDiasFechaActual(form.FechaBaja.value);

    // // Validacion de bajada
    // if (diffDiasActual < 0 || isNaN(diffDiasActual)) {
    //   const errorVal = {
    //     "emp_fechabaja": "Fecha tiene que mayor a 0. ",

    //   }
    //   setLoading(false);
    //   setError(errorVal);
    //   return;
    // }

    // Validacion inicio prueba, fin prueba
    if (diffDiasPrueba < 2 || isNaN(diffDiasPrueba)) {
      const errorVal = {
        emp_Fec_fin_prueba: "La diferencia de días tiene que ser mayor a 2",
      };
      setError(errorVal);
      setLoading(false);
      return;
    }

    // Validacion edad
    if (edad < 18 || isNaN(edad)) {
      const errorVal = {
        emp_fechanac: "Debe ser mayor de edad.",
      };

      setLoading(false);
      setError(errorVal);
      return;
    }
    // Validacion numerico
    if (validationOnlyNumbers(form.Dni.value) === false) {
      const errorVal = {
        emp_dni: "Solo se permiten números.",
      };
      setLoading(false);
      setError(errorVal);
      return;
    }

    if (validationOnlyNumbers(form.Telefono.value) === false) {
      const errorVal = {
        emp_telefono: "Solo se permiten números.",
      };
      setLoading(false);
      setError(errorVal);
      return;
    }

    // if (validationOnlyNumbers(form.DiasAdicionales.value) === false) {
    //   const errorVal = {
    //     "emp_dias_extra": "Solo se permiten numeros",
    //   }
    //   setLoading(false);
    //   setError(errorVal);
    //   return;
    // }

    setError([]);

    const nuevoEmpleado = {
      emp_nombre: form.Nombres.value,
      emp_apellido: form.Apellidos.value,
      // emp_fechabaja,
      emp_fec_inicio_prueba: form.FechaInicioPrueba.value,
      emp_Fec_fin_prueba: form.FechaFinPrueba.value,
      emp_TurnoId: form.Turno.value,
      Emp_Perfiles_Id: form.perfil.value,
      Emp_Area_Id: form.Area.value,
      Emp_Unidad_Id_fk: form.Unidad.value,
      Emp_Marca_Id_fk: form.Marca.value,
      emp_dni: form.Dni.value,
      emp_carrera: form.Carrera.value,
      emp_email: form.Email.value,
      emp_telefono: form.Telefono.value,
      emp_link_cv: form.Cv.value,
      emp_link_calificaciones: form.Calificaciones.value,
      Emp_Id_Convenio_fk: form.Convenio.value,
      emp_link_convenio: form.ConvenioUrl.value,
      emp_fechanac: form.FechaNacimiento.value,
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/insertarEmpleado`,
        nuevoEmpleado,
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
        setError([]);
        abrircerrarModalInsertar();
        peticionGet();
      })
      .catch((e) => {
        //  setSucess(false);
        setLoading(false);
        setError(e.response.data.errors);
      });
    setLoading(false);
  };
  const bodyEditar = (
    <form onSubmit={actualizarEmpleado}>
      <div className={styles.modal}>
        <h3 className="text-2xl text-medium my-3">EDITAR EMPLEADO</h3>

        <div className="flex flex-col w-full justify-evenly items-center my-3 md:flex-row">
          <div className="mx-3 w-90 md:w-40">
            <TextField
              className={styles.inputMaterial}
              label="Nombres"
              name="Nombres"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Nombres"]}
            />
            <Error errors={errorUpdate["Emp_Nombre"]}></Error>
            <br />

            <TextField
              className={styles.inputMaterial}
              label="Apellidos"
              name="Apellidos"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Apellidos"]}
            />
            <Error errors={errorUpdate["emp_apellido"]}></Error>
            <br />

            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha de baja"
              name="Fecha baja"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Fecha baja"]}
            />
            <Error errors={errorUpdate["emp_fechabaja"]}></Error>
            <br />

            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha de inicio prueba"
              name="Fecha inicio prueba"
              onChange={handleChangeEdit}
              value={
                empleadoSeleccionado &&
                empleadoSeleccionado["Fecha inicio prueba"]
              }
            />
            <Error errors={errorUpdate["emp_fec_inicio_prueba"]}></Error>
            <br />

            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha de fin de prueba"
              name="Fecha fin prueba"
              onChange={handleChangeEdit}
              value={
                empleadoSeleccionado && empleadoSeleccionado["Fecha fin prueba"]
              }
            />
            <Error errors={errorUpdate["emp_Fec_fin_prueba"]}></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="turno">Turno</InputLabel>
              <Select
                labelId="turno"
                id="turno"
                name="Turno"
                label="Turno"
                onChange={handleChangeEdit}
                value={empleadoSeleccionado && empleadoSeleccionado["Turno"]}
              >
                <MenuItem value={1}>Mañana</MenuItem>
                <MenuItem value={2}>Tarde</MenuItem>
                <MenuItem value={3}>Mañana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate["emp_TurnoId"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="Unidad">Departamento</InputLabel>
              <Select
                labelId="Unidad"
                id="Unidad"
                label="Unidad"
                name="Departamento"
                onChange={handleChangeEdit}
                value={
                  empleadoSeleccionado && empleadoSeleccionado["Departamento"]
                }
              >
                {unidades.map((option, i) => {
                  return (
                    <MenuItem key={i + 1} value={i + 1}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["Emp_Unidad_Id_fk"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="perfil">Marca</InputLabel>
              <Select
                labelId="Marca"
                id="Marca"
                label="Marca"
                name="Marca"
                onChange={handleChangeEdit}
                value={empleadoSeleccionado && empleadoSeleccionado["Marca"]}
              >
                {marcas.map((option, i) => {
                  return (
                    <MenuItem key={i + 1} value={i + 1}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["Emp_Marca_Id_fk"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="perfil">Perfil</InputLabel>
              <Select
                labelId="perfil"
                className="flex-1"
                value={empleadoSeleccionado && empleadoSeleccionado["Perfil"]}
                onChange={handleChangeEdit}
                // onChange={handleChange}
                // value={perfil}
                id="perfil"
                name="Perfil"
                label="perfil"
              >
                {perfiles.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.perfil_Id}>
                      {option.perfil_nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["Emp_Perfiles_Id"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="area">Área</InputLabel>
              <Select
                labelId="area"
                className="flex-1"
                // onChange={handleChange}
                // value={perfil}
                id="area"
                name="Area"
                label="Area"
                onChange={handleChangeEdit}
                value={empleadoSeleccionado && empleadoSeleccionado["Area"]}
              >
                {areasEmp.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.Area_Id}>
                      {option.Area_Nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={errorUpdate["emp_AreaId"]}></Error>
            <br />
          </div>
          <div className="mx-3 w-90 md:w-40">
            <TextField
              className={styles.inputMaterial}
              label="DNI"
              name="Dni"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Dni"]}
            />
            <Error errors={errorUpdate["emp_dni"]}></Error>
            <br />

            <TextField
              className={styles.inputMaterial}
              label="Carrera"
              name="Carrera"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Carrera"]}
            />
            <Error errors={errorUpdate["emp_carrera"]}></Error>
            <br />
            <TextField
              type="email"
              className={styles.inputMaterial}
              label="Email"
              name="Correo"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Correo"]}
            />
            <Error errors={errorUpdate["emp_email"]}></Error>
            <br />

            <TextField
              type="tel"
              className={styles.inputMaterial}
              label="Telefono"
              name="Telefono"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Telefono"]}
            />
            <Error errors={errorUpdate["emp_telefono"]}></Error>
            <br />

            <TextField
              type="url"
              className={styles.inputMaterial}
              label="Url de CV"
              name="Link CV"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Link CV"]}
            />
            <Error errors={errorUpdate["emp_link_cv"]}></Error>
            <br />

            {/* <FormControl fullWidth>
              <InputLabel id="capacitacion">
                Condicion de capacitación
              </InputLabel>
              <Select
                labelId="capacitacion"
                id="capacitacion"
                name="Condicion Capacitación"
                label="Condicion de capacitación"
                onChange={handleChangeEdit}
                value={
                  empleadoSeleccionado &&
                  empleadoSeleccionado["Condicion Capacitación"]
                }
              >
                <MenuItem value={1}>Terminó capacitación</MenuItem>
                <MenuItem value={2}>No terminó capacitación</MenuItem>
                <MenuItem value={3}>En proceso</MenuItem>
              </Select>
            </FormControl>
            <Error
              errors={errorUpdate["Emp_Id_Condicion_capacitacion_fk"]}
            ></Error>
            <br /> */}

            <TextField
              type="url"
              className={styles.inputMaterial}
              label="Url de calificaciones"
              name="Link Calificaciones"
              onChange={handleChangeEdit}
              value={
                empleadoSeleccionado &&
                empleadoSeleccionado["Link Calificaciones"]
              }
            />
            <Error errors={errorUpdate["emp_link_calificaciones"]}></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="convenio">Condicion de convenio</InputLabel>
              <Select
                labelId="convenio"
                id="convenio"
                name="Convenio"
                label="Convenio"
                onChange={handleChangeEdit}
                value={empleadoSeleccionado && empleadoSeleccionado["Convenio"]}
              >
                <MenuItem value={1}>Firmado</MenuItem>
                <MenuItem value={2}>Enviado para firmar</MenuItem>
                <MenuItem value={3}>No firmado</MenuItem>
                <MenuItem value={4}>Terminó convenio</MenuItem>
                <MenuItem value={5}>En proceso</MenuItem>
                <MenuItem value={6}>Retirado</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate["Emp_Id_Convenio_fk"]}></Error>
            <br />

            <TextField
              type="url"
              className={styles.inputMaterial}
              label="Url de convenio"
              name="Link Convenio"
              onChange={handleChangeEdit}
              value={
                empleadoSeleccionado && empleadoSeleccionado["Link Convenio"]
              }
            />
            <Error errors={errorUpdate["emp_link_convenio"]}></Error>
            <br />

            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha de Nacimiento"
              name="Fecha Nacimiento"
              onChange={handleChangeEdit}
              value={
                empleadoSeleccionado && empleadoSeleccionado["Fecha Nacimiento"]
              }
            />
            <Error errors={errorUpdate["emp_fechanac"]}></Error>
            <br />

            <TextField
              type="number"
              className={styles.inputMaterial}
              label="Dias adicionales de trabajo"
              name="Días extra"
              onChange={handleChangeEdit}
              value={empleadoSeleccionado && empleadoSeleccionado["Días extra"]}
            />
            <Error errors={errorUpdate["emp_dias_extra"]}></Error>
            <br />
          </div>
        </div>
        <br />
        <div align="right">
          {loading ? (
            <Loading />
          ) : (
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              type="submit"
            >
              EDITAR
            </button>
          )}
          <button
            onClick={() => abrircerrarModalEditar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </form>
  );

  const bodyInsertar = (
    <form onSubmit={manejadorInsertar}>
      <div className={styles.modal}>
        <h3 className="text-2xl text-medium my-3">AGREGAR EMPLEADO</h3>

        <div className="flex flex-col w-full justify-evenly items-center my-3 md:flex-row">
          <div className="mx-3 w-90 md:w-40">
            <TextField
              className={styles.inputMaterial}
              label="Nombres"
              name="Nombres"
            />
            <Error errors={error["emp_nombre"]}></Error>
            <br />

            <TextField
              className={styles.inputMaterial}
              label="Apellidos"
              name="Apellidos"
            />
            <Error errors={error["emp_apellido"]}></Error>
            <br />

            {/* <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de baja" name="FechaBaja" />
            <Error errors={error['emp_fechabaja']} ></Error>
            <br /> */}

            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha de inicio prueba"
              name="FechaInicioPrueba"
            />
            <Error errors={error["emp_fec_inicio_prueba"]}></Error>
            <br />

            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha de fin de prueba"
              name="FechaFinPrueba"
            />
            <Error errors={error["emp_Fec_fin_prueba"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="turno">Turno</InputLabel>
              <Select labelId="turno" id="turno" label="Turno" name="Turno">
                <MenuItem value={1}>Mañana</MenuItem>
                <MenuItem value={2}>Tarde</MenuItem>
                <MenuItem value={3}>Mañana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error["emp_TurnoId"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="Unidad">Departamento</InputLabel>
              <Select labelId="Unidad" id="Unidad" label="Unidad" name="Unidad">
                {unidades.map((option, i) => {
                  return (
                    <MenuItem key={i + 1} value={i + 1}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["Emp_Unidad_Id_fk"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="perfil">Marca</InputLabel>
              <Select labelId="Marca" id="Marca" label="Marca" name="Marca">
                {marcas.map((option, i) => {
                  return (
                    <MenuItem key={i + 1} value={i + 1}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["Emp_Marca_Id_fk"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="perfil">Perfil</InputLabel>
              <Select
                labelId="perfil"
                className="flex-1"
                // onChange={handleChange}
                // value={perfil}
                id="perfil"
                name="perfil"
                label="perfil"
              >
                {perfiles.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.perfil_Id}>
                      {option.perfil_nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["Emp_Perfiles_Id"]}></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="area">Área</InputLabel>
              <Select
                labelId="area"
                className="flex-1"
                // onChange={handleChange}
                // value={perfil}
                id="area"
                name="Area"
                label="Area"
              >
                {areasEmp.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.Area_Id}>
                      {option.Area_Nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["emp_AreaId"]}></Error>
            <br />
            {/* <br />
            <FormControl fullWidth>
              <div className="flex-1 mt-2 flex items-center">
                <label id="subArea">SubArea</label>
              </div>
              <TextField
                className={styles.inputMaterial}
                disabled
                name="Area"
                value={subarea}
              />
            </FormControl>
            <Error errors={error["emp_AreaId"]}></Error> 
            <br /> */}
            {/*************SubArea************/}
            {/* <FormControl fullWidth>
              <InputLabel id="subArea">SubArea</InputLabel>
              <Select
                labelId="subArea"
                className="flex-1"
                // onChange={handleChange}
                // value={perfil}
                id="subArea"
                name="SubArea"
                label="SubArea"
              >
                {areasEmp.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.Area_Id}>
                      {option.Area_Nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Error errors={error["emp_AreaId"]}></Error>
            <br /> */}
          </div>

          <div className="mx-3 w-90 md:w-40">
            <TextField
              className={styles.inputMaterial}
              label="DNI"
              name="Dni"
            />
            <Error errors={error["emp_dni"]}></Error>
            <br />

            <TextField
              className={styles.inputMaterial}
              label="Carrera"
              name="Carrera"
            />
            <Error errors={error["emp_carrera"]}></Error>
            <br />
            <TextField
              type="email"
              className={styles.inputMaterial}
              label="Email"
              name="Email"
            />
            <Error errors={error["emp_email"]}></Error>
            <br />
            <TextField
              type="tel"
              className={styles.inputMaterial}
              label="Telefono"
              name="Telefono"
            />
            <Error errors={error["emp_telefono"]}></Error>
            <br />
            <TextField
              type="url"
              className={styles.inputMaterial}
              label="Url de CV"
              name="Cv"
            />
            <Error errors={error["emp_link_cv"]}></Error>
            {/* <br />
            <FormControl fullWidth>
              <InputLabel id="capacitacion">
                Condicion de capacitación
              </InputLabel>
              <Select
                labelId="capacitacion"
                id="capacitacion"
                label="Condicion de capacitación"
                name="Capacitacion"
              >
                <MenuItem value={1}>Terminó capacitación</MenuItem>
                <MenuItem value={2}>No terminó capacitación</MenuItem>
                <MenuItem value={3}>En proceso</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error["Emp_Id_Condicion_capacitacion_fk"]}></Error> */}
            <br />
            <TextField
              type="url"
              className={styles.inputMaterial}
              label="Url de calificaciones"
              name="Calificaciones"
            />
            <Error errors={error["emp_link_calificaciones"]}></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="convenio">Condicion de convenio</InputLabel>
              <Select
                labelId="convenio"
                id="convenio"
                label="Convenio"
                name="Convenio"
              >
                <MenuItem value={1}>Firmado</MenuItem>
                <MenuItem value={2}>Enviado para firmar</MenuItem>
                <MenuItem value={3}>No firmado</MenuItem>
                <MenuItem value={4}>Terminó convenio</MenuItem>
                <MenuItem value={5}>En proceso</MenuItem>
                <MenuItem value={6}>Retirado</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error["Emp_Id_Convenio_fk"]}></Error>
            <br />

            <TextField
              type="url"
              className={styles.inputMaterial}
              label="Url de convenio"
              name="ConvenioUrl"
            />
            <Error errors={error["emp_link_convenio"]}></Error>
            <br />

            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              className={styles.inputMaterial}
              label="Fecha de Nacimiento"
              name="FechaNacimiento"
            />
            <Error errors={error["emp_fechanac"]}></Error>
            <br />

            {/* <TextField type="number" className={styles.inputMaterial} label="Dias adicionales de trabajo" name="DiasAdicionales" />
            <Error errors={error['emp_dias_extra']} ></Error>
            <br /> */}
          </div>
        </div>

        <br />
        <div align="right">
          {loading ? (
            <Loading />
          ) : (
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              type="submit"
            >
              INSERTAR
            </button>
          )}
          <button
            onClick={() => abrircerrarModalInsertar()}
            className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </form>
  );
  //   const tableRef = React.createRef();
  if (loading) {
    return (
      <div className="flex justify-center align-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <div className=" text-center flex flex-col  ">
          <div className="flex justify-center align-center ">
            <div className="shadow-sm rounded-2xl mb-2 border-black">
              <Button onClick={() => abrircerrarModalInsertar()}>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/add--v1.png"
                  alt=""
                />
                Insertar Empleado
              </Button>
            </div>
          </div>
          <div>
            <MaterialTable
              columns={[
                { title: "ID", field: "Id", filtering: false },
                { title: "Nombres", field: "Nombres", filtering: false },
                { title: "Apellidos", field: "Apellidos", filtering: false },
                { title: "DNI", field: "Dni", filtering: false },
                {
                  title: "Fecha Inicio Prueba",
                  field: "Fecha inicio prueba",
                  filtering: false,
                },
                {
                  title: "Fecha Fin Prueba",
                  field: "Fecha fin prueba",
                  filtering: false,
                },
                { title: "Turno", field: "Turno", lookup: turnos },
                { title: "Perfil", field: "Perfil", lookup: resultPerfil2 },
              //  { title: "SubArea", field: "SubArea", lookup: resultSubarea2 },
                { title: "Área", field: "Area", lookup: resultArea2 },
                {
                  title: "Departamento",
                  field: "Departamento",
                  lookup: resultUnidad2,
                },
                { title: "Marca", field: "Marca", lookup: resultMarca2 },
                { title: "Carrera", field: "Carrera", filtering: false },
                { title: "Teléfono", field: "Telefono", filtering: false },
                { title: "Link CV", field: "Link CV", filtering: false },
                { title: "Correo", field: "Correo", filtering: false },
                {
                  title: "Link Calificaciones",
                  field: "Link Calificaciones",
                  filtering: false,
                },

                {
                  title: "Link Convenio",
                  field: "Link Convenio",
                  filtering: false,
                },
                {
                  title: "Fecha Nacimiento",
                  field: "Fecha Nacimiento",
                  filtering: false,
                },
                {
                  title: "Fecha Inicio Practicas",
                  field: "Fecha inicio practicas",
                  filtering: false,
                },
                { title: "Días extra", field: "Días extra", filtering: false },
                {
                  title: "Fecha Salida Practicas",
                  field: "Fecha salida practicas",
                  filtering: false,
                },
                {
                  title: "Fecha Fin Practicas",
                  field: "Fecha fin practicas",
                  filtering: false,
                },
                {
                  title: "Días Fin Practicas",
                  field: "Días fin practicas",
                  filtering: false,
                },
                {
                  title: "Nro Días Cumple",
                  field: "Nro días cumple",
                  filtering: false,
                },
                { title: "Fecha Baja", field: "Fecha baja", filtering: false },
                { title: "Convenio", field: "Convenio", lookup: condConv },
                {
                  title: "Condición Practicas",
                  field: "Condición Practicas",
                  lookup: condPrac,
                },
                { title: "Estado", field: "Estado", lookup: condEst },
                {
                  title: "Tipo Empleado",
                  field: "Tipo Empleado",
                  lookup: tipColab,
                },
              ]}
              data={data}
              title="Tabla de empleados"
              // tableRef={tableRef}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Editar Empleado",
                  onClick: (event, rowData) => {
                    seleccionarEmpleado(rowData, "Editar");
                  },
                },
                //   {
                //     icon: 'refresh',
                //     tooltip: 'Refresh Data',
                //     isFreeAction: true,
                //     onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                //   }
              ]}
              options={{
                // fixedColumns: {

                //   right: 1
                // },
                filtering: true,
                headerStyle: {
                  backgroundColor: "#E2E2E2  ",
                },
                exportButton: {
                  csv: true,
                  pdf: false,
                },
                exportAllData: true,
                exportFileName: "Tabla de Empleados",
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
          </div>
        </div>
        <Modal animation={"false"} open={modalInsertar}>
          {bodyInsertar}
        </Modal>
        <Modal animation={"false"} open={modalEditar}>
          {bodyEditar}
        </Modal>
      </div>
    );
  }
}
export default TablaEmpleados;