import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Modal, TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { setToken, getToken } from "../dist/Token";
import Error from "../components/item/Error";
import Loading from "../components/Loading";
import Success from './item/Sucess';
import { calcularEdad, calcularDiferenciaDias, calcularDiferenciaDiasFechaActual } from '../helpers/fecha';
import { validationOnlyNumbers } from '../helpers/validaciones';


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '80%',
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
  },
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
    // Validaciones de frontend

    const form = e.target.elements;
    const edad = calcularEdad(form['Fecha Nacimiento'].value);
    const diffDiasPrueba = calcularDiferenciaDias(form['Fecha inicio prueba'].value, form['Fecha fin prueba'].value);
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

        setLoading(false);
        setErrorUpdate([]);
        peticionGet();
        abrircerrarModalEditar();
      }).catch(error => {
        setLoading(false);
        setErrorUpdate(error.response.data.errors);

      });
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
    if (empleadoFormateado['Condicion Capacitación'] === "Terminó capacitación") {
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
  }



  // Insertar nuevo empleado
  const manejadorInsertar = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target.elements;
    const edad = calcularEdad(form.FechaNacimiento.value);
    const diffDiasPrueba = calcularDiferenciaDias(form.FechaInicioPrueba.value, form.FechaFinPrueba.value);
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

    // if (validationOnlyNumbers(form.DiasAdicionales.value) === false) {
    //   const errorVal = {
    //     "emp_dias_extra": "Solo se permiten numeros",
    //   }
    //   setLoading(false);
    //   setError(errorVal);
    //   return;
    // }


    setError([]);



    const nuevoEmpleado = await {
      "emp_nombre": form.Nombres.value,
      "emp_apellido": form.Apellidos.value,
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
    };


    await setEmpleado(nuevoEmpleado);

    await axios.post(`http://localhost:8232/api/insertarEmpleado`, nuevoEmpleado,
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
      //error update
        setSucess(true);
        peticionGet();
        abrircerrarModalInsertar();

      })
      .catch((e) => {
        console.log(e.response.data.errors);
        setSucess(false);
        setLoading(false);
        setError(e.response.data.errors);
      });
    setLoading(false);
  }
  const bodyEditar = (
    <form onSubmit={actualizarEmpleado}>
      <div className={styles.modal}>
        <h3>Editar Empleado</h3>


        <div className="flex flex-wrap justify-around content-center">
          <div style={{ width: '40%' }}>
            <TextField className={styles.inputMaterial} label="Nombres" name="Nombres" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Nombres']} />
             <Error errors={errorUpdate['emp_nombre']} ></Error>
            <br />

            <TextField className={styles.inputMaterial} label="Apellidos" name="Apellidos" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Apellidos']} />
            <Error errors={errorUpdate['emp_apellido']} ></Error>
            <br />

            <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de baja" name="Fecha baja" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha baja']} />
            <Error errors={errorUpdate['emp_fechabaja']} ></Error>
            <br />

            <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de inicio prueba" name="Fecha inicio prueba" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha inicio prueba']} />
            <Error errors={errorUpdate['emp_fec_inicio_prueba']} ></Error>
            <br />

            <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de fin de prueba" name="Fecha fin prueba" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha fin prueba']} />
            <Error errors={errorUpdate['emp_Fec_fin_prueba']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="turno">Turno</InputLabel>
              <Select labelId="turno" id="turno" name="Turno" label="Turno" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Turno']} >
                <MenuItem value={1}>Mañana</MenuItem>
                <MenuItem value={2}>Tarde</MenuItem>
                <MenuItem value={3}>Mañana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate['emp_TurnoId']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="area">Area</InputLabel>
              <Select labelId="area" id="area" name="Perfil" label="Area" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Perfil']} >
                <MenuItem value={1}>Administracion</MenuItem>
                <MenuItem value={2}>Relaciones Publicas</MenuItem>
                <MenuItem value={3}>Comunity Manager Web</MenuItem>
                <MenuItem value={4}>Talento Humano</MenuItem>
                <MenuItem value={5}>Diseño Grafico</MenuItem>
                <MenuItem value={6}>Ventas</MenuItem>
                <MenuItem value={7}>Comunity Manager</MenuItem>
                <MenuItem value={8}>Big Data</MenuItem>
                <MenuItem value={9}>Diseño Web</MenuItem>
                <MenuItem value={10}>Desarrollo Web</MenuItem>
                <MenuItem value={11}>Soporte Tecnico</MenuItem>
                <MenuItem value={12}>Atención Al Cliente Digital</MenuItem>
                <MenuItem value={13}>Administracion Scrum</MenuItem>
                <MenuItem value={14}>Arquitectura</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate['emp_AreaId']} ></Error>
            <br />

            <TextField className={styles.inputMaterial} label="DNI" name="Dni" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Dni']} />
            <Error errors={errorUpdate['emp_dni']} ></Error>
            <br />

            <TextField className={styles.inputMaterial} label="Carrera" name="Carrera" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Carrera']} />
            <Error errors={errorUpdate['emp_carrera']} ></Error>
            <br />
          </div>
          <div style={{ width: '40%' }}>
            <TextField type="email" className={styles.inputMaterial} label="Email" name="Correo" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Correo']} />
            <Error errors={errorUpdate['emp_email']} ></Error>
            <br />

            <TextField type="tel" className={styles.inputMaterial} label="Telefono" name="Telefono" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Telefono']} />
            <Error errors={errorUpdate['emp_telefono']} ></Error>
            <br />

            <TextField type="url" className={styles.inputMaterial} label="Url de CV" name="Link CV" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link CV']} />
            <Error errors={errorUpdate['emp_link_cv']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="capacitacion">Condicion de capacitación</InputLabel>
              <Select labelId="capacitacion" id="capacitacion" name="Condicion Capacitación" label="Condicion de capacitación" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Condicion Capacitación']} >
                <MenuItem value={1}>Terminó capacitación</MenuItem>
                <MenuItem value={2}>No terminó capacitación</MenuItem>
                <MenuItem value={3}>En proceso</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate['Emp_Id_Condicion_capacitacion_fk']} ></Error>
            <br />

            <TextField type="url" className={styles.inputMaterial} label="Url de calificaciones" name="Link Calificaciones" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link Calificaciones']} />
            <Error errors={errorUpdate['emp_link_calificaciones']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="convenio">Condicion de convenio</InputLabel>
              <Select labelId="convenio" id="convenio" name="Convenio" label="Convenio" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Convenio']} >
                <MenuItem value={1}>Firmado</MenuItem>
                <MenuItem value={2}>Enviado para firmar</MenuItem>
                <MenuItem value={3}>No firmado</MenuItem>
                <MenuItem value={4}>Terminó convenio</MenuItem>
                <MenuItem value={5}>En proceso</MenuItem>
                <MenuItem value={6}>Retirado</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate['Emp_Id_Convenio_fk']} ></Error>
            <br />

            <TextField type="url" className={styles.inputMaterial} label="Url de convenio" name="Link Convenio" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link Convenio']} />
            <Error errors={errorUpdate['emp_link_convenio']} ></Error>
            <br />

            <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de Nacimiento" name="Fecha Nacimiento" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha Nacimiento']} />
            <Error errors={errorUpdate['emp_fechanac']} ></Error>
            <br />

            <TextField type="number" className={styles.inputMaterial} label="Dias adicionales de trabajo" name="Días extra" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Días extra']} />
            <Error errors={errorUpdate['emp_dias_extra']} ></Error>
            <br />

          </div>
        </div>
        <br />
        <div align="right">
          {loading ? <Loading /> :
            <Button color="primary" type="submit" >Editar</Button>
          }
          <Button onClick={() => abrircerrarModalEditar()}>Cancelar</Button>
        </div>
      </div>
    </form>
  )

  const bodyInsertar = (
    <form onSubmit={manejadorInsertar}>
      <div className={styles.modal}>
        <h3>Agregar empleado</h3>

        {sucess ? <Success /> :
          <p></p>
        }

        <div className="flex flex-wrap justify-around content-center">
          <div style={{ width: '40%' }}>
            <TextField className={styles.inputMaterial} label="Nombres" name="Nombres" />
            <Error errors={error['emp_nombre']} ></Error>
            <br />

            <TextField className={styles.inputMaterial} label="Apellidos" name="Apellidos" />
            <Error errors={error['emp_apellido']} ></Error>
            <br />

            {/* <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de baja" name="FechaBaja" />
            <Error errors={error['emp_fechabaja']} ></Error>
            <br /> */}

            <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de inicio prueba" name="FechaInicioPrueba" />
            <Error errors={error['emp_fec_inicio_prueba']} ></Error>
            <br />

            <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de fin de prueba" name="FechaFinPrueba" />
            <Error errors={error['emp_Fec_fin_prueba']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="turno">Turno</InputLabel>
              <Select labelId="turno" id="turno" label="Turno" name="Turno" >
                <MenuItem value={1}>Mañana</MenuItem>
                <MenuItem value={2}>Tarde</MenuItem>
                <MenuItem value={3}>Mañana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error['emp_TurnoId']} ></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="area">Area</InputLabel>
              <Select labelId="area" id="area" label="Area" name="Area" >
                <MenuItem value={1}>Administracion</MenuItem>
                <MenuItem value={2}>Relaciones Publicas</MenuItem>
                <MenuItem value={3}>Comunity Manager Web</MenuItem>
                <MenuItem value={4}>Talento Humano</MenuItem>
                <MenuItem value={5}>Diseño Grafico</MenuItem>
                <MenuItem value={6}>Ventas</MenuItem>
                <MenuItem value={7}>Comunity Manager</MenuItem>
                <MenuItem value={8}>Big Data</MenuItem>
                <MenuItem value={9}>Diseño Web</MenuItem>
                <MenuItem value={10}>Desarrollo Web</MenuItem>
                <MenuItem value={11}>Soporte Tecnico</MenuItem>
                <MenuItem value={12}>Atención Al Cliente Digital</MenuItem>
                <MenuItem value={13}>Administracion Scrum</MenuItem>
                <MenuItem value={14}>Arquitectura</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error['emp_AreaId']} ></Error>
            <br />

            <TextField className={styles.inputMaterial} label="DNI" name="Dni" />
            <Error errors={error['emp_dni']} ></Error>
            <br />

            <TextField className={styles.inputMaterial} label="Carrera" name="Carrera" />
            <Error errors={error['emp_carrera']} ></Error>
            <br />
          </div>

          <div style={{ width: '40%' }}>
            <TextField type="email" className={styles.inputMaterial} label="Email" name="Email" />
            <Error errors={error['emp_email']} ></Error>
            <br />

            <TextField type="tel" className={styles.inputMaterial} label="Telefono" name="Telefono" />
            <Error errors={error['emp_telefono']} ></Error>
            <br />

            <TextField type="url" className={styles.inputMaterial} label="Url de CV" name="Cv" />
            <Error errors={error['emp_link_cv']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="capacitacion">Condicion de capacitación</InputLabel>
              <Select labelId="capacitacion" id="capacitacion" label="Condicion de capacitación" name="Capacitacion" >
                <MenuItem value={1}>Terminó capacitación</MenuItem>
                <MenuItem value={2}>No terminó capacitación</MenuItem>
                <MenuItem value={3}>En proceso</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error['Emp_Id_Condicion_capacitacion_fk']} ></Error>
            <br />

            <TextField type="url" className={styles.inputMaterial} label="Url de calificaciones" name="Calificaciones" />
            <Error errors={error['emp_link_calificaciones']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="convenio">Condicion de convenio</InputLabel>
              <Select labelId="convenio" id="convenio" label="Convenio" name="Convenio"  >
                <MenuItem value={1}>Firmado</MenuItem>
                <MenuItem value={2}>Enviado para firmar</MenuItem>
                <MenuItem value={3}>No firmado</MenuItem>
                <MenuItem value={4}>Terminó convenio</MenuItem>
                <MenuItem value={5}>En proceso</MenuItem>
                <MenuItem value={6}>Retirado</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error['Emp_Id_Convenio_fk']} ></Error>
            <br />

            <TextField type="url" className={styles.inputMaterial} label="Url de convenio" name="ConvenioUrl" />
            <Error errors={error['emp_link_convenio']} ></Error>
            <br />

            <TextField InputLabelProps={{ shrink: true, required: true }} type="date" className={styles.inputMaterial} label="Fecha de Nacimiento" name="FechaNacimiento" />
            <Error errors={error['emp_fechanac']} ></Error>
            <br />

            {/* <TextField type="number" className={styles.inputMaterial} label="Dias adicionales de trabajo" name="DiasAdicionales" />
            <Error errors={error['emp_dias_extra']} ></Error>
            <br /> */}
          </div>
        </div>







        <br />
        <div align="right">
          {loading ? <Loading /> :
            <Button color="primary" type="submit" >Insertar</Button>
          }
          <Button onClick={() => abrircerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    </form>
  )
  //   const tableRef = React.createRef();
  return (
    <div>
      <br />
      <div className=" text-center flex flex-col  ">
        <div className="flex justify-center align-center ">
          <div className="shadow-sm rounded-2xl mb-2 border-black">
            <Button onClick={() => abrircerrarModalInsertar()}><img src="https://img.icons8.com/ios-glyphs/30/000000/add--v1.png" />Insertar Empleado</Button>
          </div>
        </div>
        <div>
          <MaterialTable
            columns={[

              { title: 'ID', field: 'Id' },
              { title: 'Nombres', field: 'Nombres' },
              { title: 'Apellidos', field: 'Apellidos' },
              { title: 'Fecha Inicio Prueba', field: 'Fecha inicio prueba', type: 'date' },
              { title: 'Fecha Fin Prueba', field: 'Fecha fin prueba', type: 'date' },
              { title: 'Turno', field: 'Turno' },
              { title: 'Perfil', field: 'Perfil' },
              { title: 'Dni', field: 'Dni' },
              { title: 'Carrera', field: 'Carrera' },
              { title: 'Telefono', field: 'Telefono' },
              { title: 'Link CV', field: 'Link CV' },
              { title: 'Correo', field: 'Correo' },
              { title: 'Condicion Capacitación', field: 'Condicion Capacitación' },
              { title: 'Link Calificaciones', field: 'Link Calificaciones' },
              { title: 'Convenio', field: 'Convenio' },
              { title: 'Link Convenio', field: 'Link Convenio' },
              { title: 'Fecha Nacimiento', field: 'Fecha Nacimiento', type: 'date' },
              { title: 'Area', field: 'Unidad' },
              { title: 'Fecha Inicio Practicas', field: 'Fecha inicio practicas', type: 'date' },
              { title: 'Días extra', field: 'Días extra' },
              { title: 'Fecha Salida Practicas', field: 'Fecha salida practicas', type: 'date' },
              { title: 'Fecha Fin Practicas', field: 'Fecha fin practicas', type: 'date' },
              { title: 'Días Fin Practicas', field: 'Días fin practicas' },
              { title: 'Nro Días Cumple', field: 'Nro días cumple' },
              { title: 'Condición Practicas', field: 'Condición Practicas' },
              { title: 'Estado', field: 'Estado' },
              { title: 'Tipo Empleado', field: 'Tipo Empleado' },
              { title: 'Fecha Baja', field: 'Fecha baja', type: 'date' }
            ]}
            data={data}
            title="Tabla de Empleados"
            // tableRef={tableRef}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar Empleado',
                onClick: (event, rowData) => seleccionarEmpleado(rowData, "Editar")
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
              headerStyle: {
                backgroundColor: '#E2E2E2  ',
              },
              exportButton: true,
              actionsColumnIndex: -1
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
                // showColumnsTitle: 'Voir les colonnes',
                // showColumnsAriaLabel: 'Voir les colonnes',
                exportTitle: 'Exportar',
                exportAriaLabel: 'Exportar',
                exportName: 'Exportar como CSV',
                searchTooltip: 'Buscar',
                searchPlaceholder: 'Buscar'
              },
              header: {
                actions: 'Acciones'
              }
            }}

          />
        </div>
      </div>
      <Modal animation={false} open={modalInsertar}
        onClose={abrircerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal animation={false} open={modalEditar} onclose={abrircerrarModalEditar}>
        {bodyEditar}
      </Modal>
    </div>
  );



}
export default TablaEmpleados;