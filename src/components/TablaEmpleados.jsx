import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Modal, TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { setToken, getToken } from "../dist/Token";
import Error from "../components/item/Error";
import Loading from "../components/Loading";
//import Success from './item/Sucess';
import { calcularEdad, calcularDiferenciaDias, calcularDiferenciaDiasFechaActual } from '../helpers/fecha';
import { validationOnlyNumbers } from '../helpers/validaciones';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    overflow: 'scroll',
    overflowX: 'hidden',
    width: '80%',
    height: '95%',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
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
//  const [sucess, setSucess] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState([]);
  const [selectArea, setSelectArea] = useState([]);



  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/areas`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
      .then(response => {
        setSelectArea(response.data.Areas);
        //console.log(selectArea)
      }).catch(error => {
      })
  }, [])

  const cambiarEstado=()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }


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
    cambiarEstado();
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
    if (diffDiasPrueba < 2 || isNaN(diffDiasPrueba)) {
      const errorVal = {
        "emp_Fec_fin_prueba": "La diferencia de dias tiene que ser mayor a 2",
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

    if (validationOnlyNumbers(form['D??as extra'].value) === false) {
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
        "Emp_Id_Condicion_capacitacion_fk": empleadoSeleccionado['Condicion Capacitaci??n'],
        "emp_link_calificaciones": empleadoSeleccionado['Link Calificaciones'],
        "Emp_Id_Convenio_fk": empleadoSeleccionado['Convenio'],
        "emp_link_convenio": empleadoSeleccionado['Link Convenio'],
        "emp_fechanac": empleadoSeleccionado['Fecha Nacimiento'],
        "emp_dias_extra": empleadoSeleccionado['D??as extra']
      },
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
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
    setError([]);
    setModalInsertar(!modalInsertar);
  }

  const abrircerrarModalEditar = () => {
    setErrorUpdate([]);
    setModalEditar(!modalEditar);    
  }
  const abrircerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }


  const seleccionarEmpleado = (empleado, caso) => {
    // Formateo de 'select' turno
    
    //Cambio de else if a Switch

    let empleadoFormateado = { ...empleado };

    switch (empleadoFormateado.Turno) {
      case "Ma??ana":
        empleadoFormateado.Turno = 1;
        break;
      case "Tarde":
        empleadoFormateado.Turno = 2;
        break;
      case "Ma??ana y tarde":
        empleadoFormateado.Turno = 3;
        break;
    }

    // Formateo de 'select' area
    switch (empleadoFormateado.Perfil) {
      case 'Administracion':
        empleadoFormateado.Perfil = 1;
        break;
      case 'Relaciones Publicas':
        empleadoFormateado.Perfil = 2;
        break;
      case 'Comunity Manager Web':
        empleadoFormateado.Perfil = 3;
        break;
      case 'Talento Humano':
        empleadoFormateado.Perfil = 4;
        break;
      case 'Dise??o Grafico':
        empleadoFormateado.Perfil = 5;
        break;
      case 'Ventas':
        empleadoFormateado.Perfil = 6;
        break;
      case 'Comunity Manager':
        empleadoFormateado.Perfil = 7;
        break;
      case 'Big Data':
        empleadoFormateado.Perfil = 8;
        break;
      case 'Dise??o Web':
        empleadoFormateado.Perfil = 9;
        break;
      case 'Desarrollo Web':
        empleadoFormateado.Perfil = 10;
        break;
      case 'Soporte Tecnico':
        empleadoFormateado.Perfil = 11;
        break;
      case 'Atenci??n Al Cliente Digital':
        empleadoFormateado.Perfil = 12;
        break;
      case 'Administracion Scrum':
        empleadoFormateado.Perfil = 13;
        break;
      case 'Arquitectura':
        empleadoFormateado.Perfil = 14;
        break;
    }

    // Formateo de 'select' condicion capacitacion

    switch (empleadoFormateado['Condicion Capacitaci??n']) {
      case 'Termin?? capacitaci??n':
        empleadoFormateado['Condicion Capacitaci??n'] = 1;
        break;
      case 'No termin?? capacitaci??n':
        empleadoFormateado['Condicion Capacitaci??n'] = 2;
        break;

      case 'En proceso':
        empleadoFormateado['Condicion Capacitaci??n'] = 3;
        break;
      }

    // Formateo de 'select' convenio

    switch (empleadoFormateado['Convenio']) {
      case 'Firmado':
        empleadoFormateado['Convenio'] = 1;
        break;
      case 'Enviado para firmar':
        empleadoFormateado['Convenio'] = 2;
        break;
      case 'No firmado':
        empleadoFormateado['Convenio'] = 3;
        break;
      case 'Termin?? convenio':
        empleadoFormateado['Convenio'] = 4;
        break;
      case 'En proceso':
        empleadoFormateado['Convenio'] = 5;
        break;
      case 'Retirado':
        empleadoFormateado['Convenio'] = 6;
        break;
    }

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
    
    e.preventDefault();
    setLoading(true);
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
    if (diffDiasPrueba < 2 || isNaN(diffDiasPrueba)) {
      const errorVal = {
        "emp_Fec_fin_prueba": "La diferencia de dias tiene que ser mayor a 2",
      }
      setError(errorVal);
      setLoading(false);
      return;
    }

    // Validacion edad 
    if (edad < 18 || isNaN(edad)) {
      const errorVal = {
        "emp_fechanac": "Debe ser mayor de edad.",
      }

      setLoading(false);
      setError(errorVal);
      return;
    }
    // Validacion numerico
    if (validationOnlyNumbers(form.Dni.value) === false) {
      const errorVal = {
        "emp_dni": "Solo se permiten numeros.",
      }
      setLoading(false);
      setError(errorVal);
      return;
    }
    
    if (validationOnlyNumbers(form.Telefono.value) === false) {
      const errorVal = {
        "emp_telefono": "Solo se permiten numeros.",
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

    const nuevoEmpleado = {
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
     abrircerrarModalInsertar();
        peticionGet();
 
      })
      .catch((e) => {
      //  setSucess(false);
        setLoading(false);
        setError(e.response.data.errors);
      });
    setLoading(false);
  }
  const bodyEditar = (
    <form onSubmit={actualizarEmpleado}>
      <div className={styles.modal}>
        <h3 className="text-2xl text-medium my-3">EDITAR EMPLEADO</h3>

        <div className="flex flex-col w-full justify-evenly items-center my-3 md:flex-row justify-center items-center w-full">
          <div className="mx-3 w-90 md:w-40">
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
                <MenuItem value={1}>Ma??ana</MenuItem>
                <MenuItem value={2}>Tarde</MenuItem>
                <MenuItem value={3}>Ma??ana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={errorUpdate['emp_TurnoId']} ></Error>
            <br />

            <FormControl fullWidth>
              <InputLabel id="area">Area</InputLabel>
              <Select labelId="area" id="area" name="Perfil" label="Area" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Perfil']} >
                {selectArea.map((option,i)=>{
                  return(
                    <MenuItem key={i+1} value={i+1}>{option}</MenuItem>)
                })}
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
          <div className="mx-3 w-90 md:w-40">
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
              <InputLabel id="capacitacion">Condicion de capacitaci??n</InputLabel>
              <Select labelId="capacitacion" id="capacitacion" name="Condicion Capacitaci??n" label="Condicion de capacitaci??n" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Condicion Capacitaci??n']} >
                <MenuItem value={1}>Termin?? capacitaci??n</MenuItem>
                <MenuItem value={2}>No termin?? capacitaci??n</MenuItem>
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
                <MenuItem value={4}>Termin?? convenio</MenuItem>
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

            <TextField type="number" className={styles.inputMaterial} label="Dias adicionales de trabajo" name="D??as extra" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['D??as extra']} />
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
    <form onSubmit={manejadorInsertar}  >
      <div className={styles.modal}  >
        <h3 className="text-2xl text-medium my-3">AGREGAR EMPLEADO</h3>


        <div className="flex flex-col w-full justify-evenly items-center my-3 md:flex-row justify-center items-center w-full">
          <div className="mx-3 w-90 md:w-40">
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
                <MenuItem value={1}>Ma??ana</MenuItem>
                <MenuItem value={2}>Tarde</MenuItem>
                <MenuItem value={3}>Ma??ana y Tarde</MenuItem>
              </Select>
            </FormControl>
            <Error errors={error['emp_TurnoId']} ></Error>
            <br />
            <FormControl fullWidth>
              <InputLabel id="area">Area</InputLabel>
              <Select labelId="area" id="area" label="Area" name="Area" >
                {selectArea.map((option,i)=>{
                  return(
                    <MenuItem key={i+1} value={i+1}>{option}</MenuItem>)
                })}
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

          <div className="mx-3 w-90 md:w-40">
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
              <InputLabel id="capacitacion">Condicion de capacitaci??n</InputLabel>
              <Select labelId="capacitacion" defaultValue={3} id="capacitacion" label="Condicion de capacitaci??n" name="Capacitacion" >
                <MenuItem value={1}>Termin?? capacitaci??n</MenuItem>
                <MenuItem value={2}>No termin?? capacitaci??n</MenuItem>
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
              <Select labelId="convenio" defaultValue={5} id="convenio" label="Convenio" name="Convenio"  >
                <MenuItem value={1}>Firmado</MenuItem>
                <MenuItem value={2}>Enviado para firmar</MenuItem>
                <MenuItem value={3}>No firmado</MenuItem>
                <MenuItem value={4}>Termin?? convenio</MenuItem>
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
              { title: 'Condicion Capacitaci??n', field: 'Condicion Capacitaci??n' },
              { title: 'Link Calificaciones', field: 'Link Calificaciones' },
              { title: 'Convenio', field: 'Convenio' },
              { title: 'Link Convenio', field: 'Link Convenio' },
              { title: 'Fecha Nacimiento', field: 'Fecha Nacimiento', type: 'date' },
              { title: 'Area', field: 'Unidad' },
              { title: 'Fecha Inicio Practicas', field: 'Fecha inicio practicas', type: 'date' },
              { title: 'D??as extra', field: 'D??as extra' },
              { title: 'Fecha Salida Practicas', field: 'Fecha salida practicas', type: 'date' },
              { title: 'Fecha Fin Practicas', field: 'Fecha fin practicas', type: 'date' },
              { title: 'D??as Fin Practicas', field: 'D??as fin practicas' },
              { title: 'Nro D??as Cumple', field: 'Nro d??as cumple' },
              { title: 'Condici??n Practicas', field: 'Condici??n Practicas' },
              { title: 'Estado', field: 'Estado' },
              { title: 'Tipo Empleado', field: 'Tipo Empleado' },
              { title: 'Fecha Baja', field: 'Fecha baja' }
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
              exportButton: {
                csv: true,
                pdf: false
              },
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
                nRowsSelected: '{0} ligne(s) s??lection??e(s)',
                // showColumnsTitle: 'Voir les colonnes',
                // showColumnsAriaLabel: 'Voir les colonnes',
                exportTitle: 'Exportar',
                exportAriaLabel: 'Exportar',
                exportCSVName: "Exportar en formato CSV",
                exportPDFName: "Exportar como PDF",
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
      <Modal animation={"false"} open={modalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal animation={"false"} open={modalEditar}>
        {bodyEditar}
      </Modal>
    </div>
  );
}
export default TablaEmpleados;