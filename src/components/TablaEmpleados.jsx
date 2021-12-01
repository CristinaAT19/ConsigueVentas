import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setToken, getToken } from "../dist/Token";
import Error from "../components/item/Error";
import Loading from "../components/Loading";
import Success from './item/Sucess';
import { calcularEdad, calcularDiferenciaDias, calcularDiferenciaDiasFechaActual } from '../helpers/fecha';
import { validationOnlyNumbers } from '../helpers/validaciones';

const columnas = [
  {
    title: 'ID', field: 'Id'
  },
  {
    title: 'Nombres', field: 'Nombres'
  },
  {
    title: 'Apellidos', field: 'Apellidos'
  },
  {
    title: 'Turno', field: 'Turno'
  }
];
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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
const baseUrl = "https://desarrollo.consigueventas.com/Backend/public/api/";

function TablaEmpleados() {
  // Estilos  
  const styles = useStyles();

  // Modales
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  // Entidades
  const [empleado, setEmpleado] = useState({});
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    Id: '',
    Apellidos: '',
    Nombres: '',
  });

  // Utilidades 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [sucess, setSucess] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState([]);
  const peticionGet = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/listarEmpleados`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
      .then(response => {
        setData(response.data.empleados);
      }).catch(error => {
      })
  }
  useEffect(() => {
    peticionGet();
  }, [])


  // Actualizar empleado
  const actualizarEmpleado = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Inicio de actualizar");
    console.log(empleadoSeleccionado);





  // Validaciones de frontend

  const form = e.target.elements;
  // console.log(form['Fecha Nacimiento'].value);
  const edad = calcularEdad(form['Fecha Nacimiento'].value);
  const diffDiasPrueba = calcularDiferenciaDias(form['Fecha inicio prueba'].value, form['Fecha fin prueba'].value);
  const diffDiasActual = calcularDiferenciaDiasFechaActual(form['Fecha baja'].value);

  // Validacion de bajada
  if (diffDiasActual < 0 || isNaN(diffDiasActual)) {
    const errorVal = {
      "emp_fechabaja": "Fecha tiene que mayor a 0. ",
    }
    setLoading(false);
    setErrorUpdate(errorVal);
    return;
  }


  // Validacion inicio prueba, fin prueba 
  if (diffDiasPrueba < 10 || isNaN(diffDiasPrueba)) {
    const errorVal = {
      "emp_Fec_fin_prueba": "La diferencia de dias tiene que ser mayor a 10",
    }
    setErrorUpdate(errorVal);
    setLoading(false);
    return;
  }

  // Validacion edad 
  if (edad < 18 || isNaN(edad)) {
    const errorVal = {
      "emp_fechanac": "Debe ser mayor de edad. ",
    }

    setLoading(false);
    setErrorUpdate(errorVal);
    return;
  }
  // Validacion numerico
  if (validationOnlyNumbers(form['Dni'].value) === false) {
    const errorVal = {
      "emp_dni": "Solo se permiten numeros",
    }
    setLoading(false);
    setErrorUpdate(errorVal);
    return;
  }
  if (validationOnlyNumbers(form['Telefono'].value) === false) {
    const errorVal = {
      "emp_telefono": "Solo se permiten numeros",
    }
    setLoading(false);
    setErrorUpdate(errorVal);
    return;
  }

  if (validationOnlyNumbers(form['Días extra'].value) === false) {
    const errorVal = {
      "emp_dias_extra": "Solo se permiten numeros",
    }
    setLoading(false);
    setErrorUpdate(errorVal);
    return;
  }


  setError([]);




    await axios.post(`${process.env.REACT_APP_API_URL}/api/actualizarEmpleado/${empleadoSeleccionado['Id']}`,
      {
        "emp_nombre": empleadoSeleccionado['Nombres'],
        "emp_apellido": empleadoSeleccionado['Apellidos'],
        "emp_fechabaja": empleadoSeleccionado['Fecha baja'],
        "emp_fec_inicio_prueba": empleadoSeleccionado['Fecha inicio prueba'],
        "emp_Fec_fin_prueba": empleadoSeleccionado['Fecha fin prueba'],
        "emp_TurnoId": empleadoSeleccionado['Turno'],
        "emp_AreaId": empleadoSeleccionado['Perfil'],
        "emp_dni": empleadoSeleccionado['Dni'],
        "emp_carrera": empleadoSeleccionado['Carrera'],
        "emp_email": empleadoSeleccionado['Correo'],
        "emp_telefono": empleadoSeleccionado['Telefono'],
        "emp_link_cv": empleadoSeleccionado['Link CV'],
        "Emp_Id_Condicion_capacitacion_fk": empleadoSeleccionado['Condicion Capacitación'],
        "emp_link_calificaciones": empleadoSeleccionado['Link Calificaciones'],
        "Emp_Id_Convenio_fk": empleadoSeleccionado['Convenio'],
        "emp_link_convenio": empleadoSeleccionado['Link Convenio'],
        "emp_fechanac": empleadoSeleccionado['Fecha Nacimiento'],
        "emp_dias_extra": empleadoSeleccionado['Días extra']
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
      .then(response => {
        console.log(response);
        setLoading(false);
        setErrorUpdate([]);
      }).catch(error => {
        setLoading(false);
        console.log(error.response.data);
        setErrorUpdate(error.response.data.errors);
    });
    console.log("Fin de actualizar");
  }



  const abrircerrarModalInsertar = () => {

    setModalInsertar(!modalInsertar);
  }

  const abrircerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }
  const abrircerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }


  const seleccionarEmpleado = (empleado, caso) => {
    // Formateo de 'select' turno
    let empleadoFormateado = { ...empleado };
    if (empleadoFormateado.Turno === "Mañana") {
      empleadoFormateado.Turno = 1;
    } else if (empleadoFormateado.Turno === "Tarde") {
      empleadoFormateado.Turno = 2;
    } else if (empleadoFormateado.Turno === "Mañana y tarde") {
      empleadoFormateado.Turno = 3;
    };

    // Formateo de 'select' area
    if (empleadoFormateado.Perfil === "Administracion") {
      empleadoFormateado.Perfil = 1;
    } else if (empleadoFormateado.Perfil === "Relaciones Publicas") {
      empleadoFormateado.Perfil = 2;
    } else if (empleadoFormateado.Perfil === "Comunity Manager Web") {
      empleadoFormateado.Perfil = 3;
    } else if (empleadoFormateado.Perfil === "Talento Humano") {
      empleadoFormateado.Perfil = 4;
    } else if (empleadoFormateado.Turno === "Diseño Grafico") {
      empleadoFormateado.Perfil = 5;
    } else if (empleadoFormateado.Perfil === "Ventas") {
      empleadoFormateado.Perfil = 6;
    } else if (empleadoFormateado.Perfil === "Comunity Manager") {
      empleadoFormateado.Perfil = 7;
    } else if (empleadoFormateado.Perfil === "Big Data") {
      empleadoFormateado.Perfil = 8;
    } else if (empleadoFormateado.Perfil === "Diseño Web") {
      empleadoFormateado.Perfil = 9;
    } else if (empleadoFormateado.Perfil === "Desarrollo Web") {
      empleadoFormateado.Perfil = 10;
    } else if (empleadoFormateado.Perfil === "Soporte Tecnico") {
      empleadoFormateado.Perfil = 11;
    } else if (empleadoFormateado.Perfil === "Atención Al Cliente Digital") {
      empleadoFormateado.Perfil = 12;
    } else if (empleadoFormateado.Perfil === "Administracion Scrum") {
      empleadoFormateado.Perfil = 13;
    } else if (empleadoFormateado.Perfil === "Arquitectura") {
      empleadoFormateado.Perfil = 14;
    };

    // Formateo de 'select' condicion capacitacion
    if (empleadoFormateado['Condicion Capacitación'] === "Terminó capacitacion") {
      empleadoFormateado['Condicion Capacitación'] = 1;
    } else if (empleadoFormateado['Condicion Capacitación'] === "No terminó capacitación") {
      empleadoFormateado['Condicion Capacitación'] = 2;
    } else if (empleadoFormateado['Condicion Capacitación'] === "En proceso") {
      empleadoFormateado['Condicion Capacitación'] = 3;
    };

    // Formateo de 'select' convenio
    if (empleadoFormateado['Convenio'] === "Firmado") {
      empleadoFormateado['Convenio'] = 1;
    } else if (empleadoFormateado['Convenio'] === "Enviado para firmar") {
      empleadoFormateado['Convenio'] = 2;
    } else if (empleadoFormateado['Convenio'] === "No firmado") {
      empleadoFormateado['Convenio'] = 3;
    } else if (empleadoFormateado['Convenio'] === "Terminó convenio") {
      empleadoFormateado['Convenio'] = 4;
    } else if (empleadoFormateado['Convenio'] === "En proceso") {
      empleadoFormateado['Convenio'] = 5;
    } else if (empleadoFormateado['Convenio'] === "Retirado") {
      empleadoFormateado['Convenio'] = 6;
    };

    setEmpleadoSeleccionado(empleadoFormateado);
    (caso === "Editar") ? abrircerrarModalEditar() :
      abrircerrarModalEliminar()
  }

  // 
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(empleadoSeleccionado);
  }



  // Insertar nuevo empleado
  const manejadorInsertar = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target.elements;
    const edad = calcularEdad(form.FechaNacimiento.value);
    const diffDiasPrueba = calcularDiferenciaDias(form.FechaInicioPrueba.value, form.FechaFinPrueba.value);
    const diffDiasActual = calcularDiferenciaDiasFechaActual(form.FechaBaja.value);

    // Validacion de bajada
    if (diffDiasActual < 0 || isNaN(diffDiasActual)) {
      const errorVal = {
        "emp_fechabaja": "Fecha tiene que mayor a 0. ",

      }
      setLoading(false);
      setError(errorVal);
      return;
    }


    // Validacion inicio prueba, fin prueba 
    if (diffDiasPrueba < 10 || isNaN(diffDiasPrueba)) {
      const errorVal = {
        "emp_Fec_fin_prueba": "La diferencia de dias tiene que ser mayor a 10",
      }
      setError(errorVal);
      setLoading(false);
      return;
    }

    // Validacion edad 
    if (edad < 18 || isNaN(edad)) {
      const errorVal = {
        "emp_fechanac": "Debe ser mayor de edad. ",
      }

      setLoading(false);
      setError(errorVal);
      return;
    }
    // Validacion numerico
    if (validationOnlyNumbers(form.Dni.value) === false) {
      const errorVal = {
        "emp_dni": "Solo se permiten numeros",
      }
      setLoading(false);
      setError(errorVal);
      return;
    }
    if (validationOnlyNumbers(form.Telefono.value) === false) {
      const errorVal = {
        "emp_telefono": "Solo se permiten numeros",
      }
      setLoading(false);
      setError(errorVal);
      return;
    }

    if (validationOnlyNumbers(form.DiasAdicionales.value) === false) {
      const errorVal = {
        "emp_dias_extra": "Solo se permiten numeros",
      }
      setLoading(false);
      setError(errorVal);
      return;
    }


    setError([]);



    const nuevoEmpleado = await {
      "emp_nombre": form.Nombres.value,
      "emp_apellido": form.Apellidos.value,
      "emp_fechabaja": form.FechaBaja.value,
      "emp_fec_inicio_prueba": form.FechaInicioPrueba.value,
      "emp_Fec_fin_prueba": form.FechaFinPrueba.value,
      "emp_TurnoId": form.Turno.value,
      "emp_AreaId": form.Area.value,
      "emp_dni": form.Dni.value,
      "emp_carrera": form.Carrera.value,
      "emp_email": form.Email.value,
      "emp_telefono": form.Telefono.value,
      "emp_link_cv": form.Cv.value,
      "Emp_Id_Condicion_capacitacion_fk": form.Capacitacion.value,
      "emp_link_calificaciones": form.Calificaciones.value,
      "Emp_Id_Convenio_fk": form.Convenio.value,
      "emp_link_convenio": form.ConvenioUrl.value,
      "emp_fechanac": form.FechaNacimiento.value,
      "emp_dias_extra": form.DiasAdicionales.value
    };


    await setEmpleado(nuevoEmpleado);

    await axios.post(`${process.env.REACT_APP_API_URL}/api/insertarEmpleado`, nuevoEmpleado,
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((Response) => {
        setError([]);
        setSucess(true);
      })
      .catch((e) => {
        setSucess(false);
        setLoading(false);
        setError(e.response.data.errors);
      });
    setLoading(false);
  }
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Empleado</h3>
      <form onSubmit={actualizarEmpleado}>

        <TextField className={styles.inputMaterial} label="Artista" name="Nombres" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Nombres']} />
        <br />
        {/* Error */}
        <Error errors={errorUpdate['emp_nombre']} ></Error>
        {/* Fin error */}

        <br />
        <TextField className={styles.inputMaterial} label="Apellidos" name="Apellidos" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Apellidos']} />
        <Error errors={errorUpdate['emp_apellido']} ></Error>
        <br />

        <label>Fecha de baja</label>
        <input type="date" placeholder="Fecha baja" name="Fecha baja" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha baja']} ></input>
        <Error errors={errorUpdate['emp_fechabaja']} ></Error>
        <br />
        <label>Fecha de inicio prueba</label>
        <input type="date" name="Fecha inicio prueba" placeholder="Fecha inicio prueba" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha inicio prueba']}  ></input>
        <Error errors={errorUpdate['emp_fec_inicio_prueba']} ></Error>
        <br />
        <label>Fecha de fin de prueba</label>
        <input type="date" name="Fecha fin prueba" placeholder="Fecha baja" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha fin prueba']} ></input>
        <Error errors={errorUpdate['emp_Fec_fin_prueba']} ></Error>
        <br />
        <label >Turno</label>
        <select placeholder="Selecione turno" name="Turno" id="" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Turno']}>
          <option value="1">Mañana</option>
          <option value="2">Tarde</option>
          <option value="3">Mañana y tarde</option>
        </select>
        <Error errors={errorUpdate['emp_TurnoId']} ></Error>

        <br />
        <label >Area </label>

        <select placeholder="Selecione area" name="Perfil" id="" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Perfil']}>
          <option value="1">Administracion</option>
          <option value="2">Relaciones Publicas</option>
          <option value="3">Comunity Manager Web</option>
          <option value="4">Talento Humano</option>
          <option value="5">Diseño Grafico</option>
          <option value="6">Ventas</option>
          <option value="7">Comunity Manager</option>
          <option value="8">Big Data</option>
          <option value="9">Diseño Web</option>
          <option value="10">Desarrollo Web</option>
          <option value="11">Soporte Tecnico</option>
          <option value="12">Atención Al Cliente Digital</option>
          <option value="13">Administracion Scrum</option>
          <option value="14">Arquitectura</option>
        </select>
        <Error errors={errorUpdate['emp_AreaId']} ></Error>

        <br />
        <label>DNI</label>
        <input type="number" name="Dni" placeholder="Insertar dni..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Dni']} ></input>
        <Error errors={errorUpdate['emp_dni']} ></Error>

        <br />
        <label >Carrera</label>
        <input type="text" name="Carrera" placeholder="Insertar carrera..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Carrera']}></input>
        <Error errors={errorUpdate['emp_carrera']} ></Error>

        <br />
        <label >Email</label>
        <input type="email" name="Correo" placeholder="Insertar email..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Correo']}></input>
        <Error errors={errorUpdate['emp_email']} ></Error>

        <br />
        <label >Telefono</label>
        <input type="number" name="Telefono" placeholder="Insertar telefono..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Telefono']}></input>
        <Error errors={errorUpdate['emp_telefono']} ></Error>

        <br />
        <label >Url del CV</label>
        <input type="url" name="Link CV" placeholder="Insertar url del CV..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link CV']}></input>
        <Error errors={errorUpdate['emp_link_cv']} ></Error>
        <br />
        <label >Condicion de capacitacion</label>
        <select placeholder="Convenio" name="Condicion Capacitación" id="" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Condicion Capacitación']}>
          <option value="1">Terminó capacitacion</option>
          <option value="2">No terminó capacitación</option>
          <option value="3">En proceso</option>
        </select>
        <Error errors={errorUpdate['Emp_Id_Condicion_capacitacion_fk']} ></Error>

        <br />
        <label >Url de calificaciones</label>
        <input type="url" name="Link Calificaciones" placeholder="Insertar url del calificaciones..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link Calificaciones']}></input>
        <Error errors={errorUpdate['emp_link_calificaciones']} ></Error>
        <br />
        <label >Convenio</label>

        <select placeholder="Convenio" name="Convenio" id="" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Convenio']}>
          <option value="1">Firmado</option>
          <option value="2">Enviado para firmar</option>
          <option value="3">No firmado</option>
          <option value="4">Terminó convenio</option>
          <option value="5">En proceso</option>
          <option value="6">Retirado</option>
        </select>
        <Error errors={errorUpdate['Emp_Id_Convenio_fk']} ></Error>

        <br />
        <label >Url de convenio</label>
        <input type="url" name="Link Convenio" placeholder="Insertar url del convenio..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link Convenio']}></input>
        <Error errors={errorUpdate['emp_link_convenio']} ></Error>
        <br />
        <label >Fecha de nacimiento</label>
        <input type="date" name="Fecha Nacimiento" placeholder="Insertar fecha de nacimiento..." onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha Nacimiento']}></input>
        <Error errors={errorUpdate['emp_fechanac']} ></Error>
        <br />
        <label >Dias adicionales de trabajo</label>
        <input type="number" name="Días extra" placeholder="Ejemplo : 0" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Días extra']}></input>
        <Error errors={errorUpdate['emp_dias_extra']} ></Error>
        <br /><br />
        <div align="right">
          {loading ? <Loading /> :
            <Button color="primary" type="submit" >Editar</Button>
          }          
          <Button onClick={() => abrircerrarModalEditar()}>Cancelar</Button>
        </div>
      </form>

    </div>
  )

  const bodyInsertar = (
    <form onSubmit={manejadorInsertar}>
      <div className={styles.modal}>
        <h3>Agregar empleado</h3>

        {sucess ? <Success /> :
          <p></p>
        }


        <TextField className={styles.inputMaterial} label="Nombres" name="Nombres" />
        {/* Error */}
        <Error errors={error['emp_nombre']} ></Error>
        {/* Fin error */}

        <br />
        <TextField className={styles.inputMaterial} label="Apellidos" name="Apellidos" />
        <Error errors={error['emp_apellido']} ></Error>
        <br />

        <label>Fecha de baja</label>
        <input type="date" name="FechaBaja" placeholder="Fecha baja" ></input>
        <Error errors={error['emp_fechabaja']} ></Error>
        <br />
        <label>Fecha de inicio prueba</label>
        <input type="date" name="FechaInicioPrueba" placeholder="Fecha baja" ></input>
        <Error errors={error['emp_fec_inicio_prueba']} ></Error>
        <br />
        <label>Fecha de fin de prueba</label>
        <input type="date" name="FechaFinPrueba" placeholder="Fecha baja" ></input>
        <Error errors={error['emp_Fec_fin_prueba']} ></Error>
        <br />
        <label >Turno</label>
        <select placeholder="Selecione turno" name="Turno" id="">
          <option value="1" selected>Mañana</option>
          <option value="2">Tarde</option>
          <option value="3">Mañana y tarde</option>
        </select>
        {/* <Error errors={error['emp_fec_inicio_prueba']} ></Error> */}
        <Error errors={error['emp_TurnoId']} ></Error>

        <br />
        <label >Area </label>

        <select placeholder="Selecione area" name="Area" id="">
          <option value="1" selected>Administracion</option>
          <option value="2">Relaciones Publicas</option>
          <option value="3">Comunity Manager Web</option>
          <option value="4">Talento Humano</option>
          <option value="5">Diseño Grafico</option>
          <option value="6">Ventas</option>
          <option value="7">Comunity Manager</option>
          <option value="8">Big Data</option>
          <option value="9">Diseño Web</option>
          <option value="10">Desarrollo Web</option>
          <option value="11">Soporte Tecnico</option>
          <option value="12">Atención Al Cliente Digital</option>
          <option value="13">Administracion Scrum</option>
          <option value="14">Arquitectura</option>
        </select>
        <Error errors={error['emp_AreaId']} ></Error>

        <br />
        <label>DNI</label>
        <input type="number" name="Dni" placeholder="Insertar dni..." ></input>
        <Error errors={error['emp_dni']} ></Error>

        <br />
        <label >Carrera</label>
        <input type="text" name="Carrera" placeholder="Insertar carrera..." ></input>
        <Error errors={error['emp_carrera']} ></Error>

        <br />
        <label >Email</label>
        <input type="email" name="Email" placeholder="Insertar email..." ></input>
        <Error errors={error['emp_email']} ></Error>

        <br />
        <label >Telefono</label>
        <input type="number" name="Telefono" placeholder="Insertar telefono..." ></input>
        <Error errors={error['emp_telefono']} ></Error>

        <br />
        <label >Url del CV</label>
        <input type="url" name="Cv" placeholder="Insertar url del CV..." ></input>
        <Error errors={error['emp_link_cv']} ></Error>
        <br />
        <label >Condicion de capacitacion</label>
        <select placeholder="Capacitacion" name="Capacitacion" id="">
          <option value="1">Terminó capacitacion</option>
          <option value="2">No terminó capacitación</option>
          <option value="3" selected>En proceso</option>
        </select>
        <Error errors={error['Emp_Id_Condicion_capacitacion_fk']} ></Error>

        <br />
        <label >Url de calificaciones</label>
        <input type="url" name="Calificaciones" placeholder="Insertar url del calificaciones..." ></input>
        <Error errors={error['emp_link_calificaciones']} ></Error>
        <br />
        <label >Convenio</label>

        <select placeholder="Convenio" name="Convenio" id="">
          <option value="1">Firmado</option>
          <option value="2">Enviado para firmar</option>
          <option value="3" selected>No firmado</option>
          <option value="4">Terminó convenio</option>
          <option value="5">En proceso</option>
          <option value="6">Retirado</option>
        </select>
        <Error errors={error['Emp_Id_Convenio_fk']} ></Error>

        <br />
        <label >Url de convenio</label>
        <input type="url" name="ConvenioUrl" placeholder="Insertar url del convenio..." ></input>
        <Error errors={error['emp_link_convenio']} ></Error>
        <br />
        <label >Fecha de nacimiento</label>
        <input type="date" name="FechaNacimiento" placeholder="Insertar fecha de nacimiento..." ></input>
        <Error errors={error['emp_fechanac']} ></Error>
        <br />
        <label >Dias adicionales de trabajo</label>
        <input type="number" name="DiasAdicionales" placeholder="Ejemplo : 0" ></input>
        <Error errors={error['emp_dias_extra']} ></Error>

        <br /><br />
        <div align="right">
          {loading ? <Loading /> :
            <Button color="primary" type="submit" >Insertar</Button>
          }
          <Button onClick={() => abrircerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    </form>
  )
  
  return (
    <div>
      <br />
      <Button onClick={() => abrircerrarModalInsertar()}>Insertar Empleado</Button>
      <MaterialTable
        columns={columnas}
        data={data}
        title="Tabla Empleados"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Empleado',
            onClick: (event, rowData) => seleccionarEmpleado(rowData, "Editar")
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        localization={{
          header: {
            actions: 'Acciones'
          }
        }}
      />
      <Modal open={modalInsertar}
        onClose={abrircerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditar} onclose={abrircerrarModalEditar}>
        {bodyEditar}
      </Modal>

    </div>
  );



}
export default TablaEmpleados;
