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

function App() {
  // Estilos  
  const styles = useStyles();

  // Modales
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);

  // Entidades
  const [empleado, setEmpleado] = useState({});
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    Id:'',
    Apellidos:'',
    Nombres:'',
  });

  // Utilidades 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [sucess, setSucess] = useState(false);

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
  const actualizarEmpleado = async () => {
    // e.preventDefault();
    console.log("Inicio de actualizar");
    // console.log(empleado);
    // console.log(empleado['Apellido']);
    // console.log(empleado['Fecha baja']);
    // console.log(empleado['Fecha Nacimiento']);
    // setLoading(true);  

    // await axios.put(`${process.env.REACT_APP_API_URL}/api/actualizarEmpleado/${empleado}`,
    //   {
    //     "emp_nombre": empleado['Nombres'],
    //     "emp_apellido": empleado['Apellidos'],
    //     "emp_fechabaja": empleado['Fecha baja'],
    //     "emp_fec_inicio_prueba": empleado['Fecha inicio prueba'],
    //     "emp_Fec_fin_prueba": empleado['Fecha fin prueba'],
    //     "emp_TurnoId": empleado['Turno'],
    //     "emp_AreaId": 1,
    //     "emp_dni": "48964896",
    //     "emp_carrera": "ing sistemas",
    //     "emp_email": "joaquinRG@mail.com",
    //     "emp_telefono": "978978111",
    //     "emp_link_cv": "https://www.ejemplos.co/",
    //     "Emp_Id_Condicion_capacitacion_fk": 3,
    //     "emp_link_calificaciones": "https://www.ejemplos.co/",
    //     "Emp_Id_Convenio_fk": 5,
    //     "emp_link_convenio": "https://www.ejemplos.co/",
    //     "emp_fechanac": "1996-09-12",
    //     "emp_dias_extra": 5
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${getToken()}`
    //     }
    //   }
    // )
    //   .then(response => {
    //     // setLoading(false);
    //     // setSucess(true);
    //     // setEmpleadoSeleccionado({
    //     //   Id: "",
    //     //   Nombres: "",
    //     //   Apellidos: "",
    //     //   Turno: "",
    //     // })
    //     // peticionGet();
    //   }).catch(error => {
    // setLoading(false);
    // setError(error.response.data.error);
    // });
    console.log("Fin de actualizar");
  }



  const abrircerrarModalInsertar = () => {

    setModalInsertar(!modalInsertar);
  }

  const abrircerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }
  const abrircerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }


  const seleccionarEmpleado=(empleado, caso)=>{
    // Formateo de 'select' turno
    let empleadoFormateado = {...empleado};
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
      empleadoFormateado['Condicion Capacitación']= 1;
    } else if (empleadoFormateado.Perfil === "No terminó capacitación") {
      empleadoFormateado['Condicion Capacitación']= 2;
    } else if (empleadoFormateado.Perfil === "En proceso") {
      empleadoFormateado['Condicion Capacitación']= 3;
    };
    // Formateo de 'select' convenio

    setEmpleadoSeleccionado(empleadoFormateado);
    (caso==="Editar")?abrircerrarModalEditar():
    abrircerrarModalEliminar()
  }

  // 
  const handleChangeEdit=(e)=>{
    const {name, value}=e.target;
    setEmpleadoSeleccionado((prevState)=>({
      ...prevState,
      [name]:value
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
      <TextField className={styles.inputMaterial} label="Artista" name="Nombres" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Nombres']} />
      <br />
        {/* Error */}
        {/* <Error errors={error['emp_nombre']} ></Error> */}
        {/* Fin error */}

        <br />
        <TextField className={styles.inputMaterial} label="Apellidos" name="Apellidos" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Apellidos']} />
        {/* <Error errors={error['emp_apellido']} ></Error> */}
        <br />

        <label>Fecha de baja</label>
        <input type="date" placeholder="Fecha baja" name="Fecha baja" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha baja']} ></input>
        {/* <Error errors={error['emp_fechabaja']} ></Error> */}
        <br />
        <label>Fecha de inicio prueba</label>
        <input type="date" name="FechaInicioPrueba" placeholder="Fecha inicio prueba" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha inicio prueba']}  ></input>
        {/* <Error errors={error['emp_fec_inicio_prueba']} ></Error> */}
        <br />
        <label>Fecha de fin de prueba</label>
        <input type="date" name="Fecha fin prueba" placeholder="Fecha baja"   onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha fin prueba']} ></input>
        {/* <Error errors={error['emp_Fec_fin_prueba']} ></Error> */}
        <br />
        <label >Turno</label>
        <select placeholder="Selecione turno" name="Turno" id="" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Turno']}>
          <option value="1">Mañana</option>
          <option value="2">Tarde</option>
          <option value="3">Mañana y tarde</option>
        </select>
        {/* <Error errors={error['emp_fec_inicio_prueba']} ></Error> */}
        {/* <Error errors={error['emp_TurnoId']} ></Error> */}

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
        {/* <Error errors={error['emp_AreaId']} ></Error> */}

        <br />
        <label>DNI</label>
        <input type="number" name="Dni" placeholder="Insertar dni..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Dni']} ></input>
        {/* <Error errors={error['emp_dni']} ></Error> */}

        <br />
        <label >Carrera</label>
        <input type="text" name="Carrera" placeholder="Insertar carrera..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Carrera']}></input>
        {/* <Error errors={error['emp_carrera']} ></Error> */}

        <br />
        <label >Email</label>
        <input type="email" name="Correo" placeholder="Insertar email..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Correo']}></input>
        {/* <Error errors={error['emp_email']} ></Error> */}

        <br />
        <label >Telefono</label>
        <input type="number" name="Telefono" placeholder="Insertar telefono..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Telefono']}></input>
        {/* <Error errors={error['emp_telefono']} ></Error> */}

        <br />
        <label >Url del CV</label>
        <input type="url" name="Link CV" placeholder="Insertar url del CV..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link CV']}></input>
        {/* <Error errors={error['emp_link_cv']} ></Error> */}
        <br />
        <label >Condicion de capacitacion</label>
        <select placeholder="Convenio" name="Condicion Capacitación" id="" onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Condicion Capacitación']}>
          <option value="1">Terminó capacitacion</option>
          <option value="2">No terminó capacitación</option>
          <option value="3" selected>En proceso</option>
        </select>
        {/* <Error errors={error['Emp_Id_Condicion_capacitacion_fk']} ></Error> */}

        <br />
        <label >Url de calificaciones</label>
        <input type="url" name="Link Calificaciones" placeholder="Insertar url del calificaciones..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link Calificaciones']}></input>
        {/* <Error errors={error['emp_link_calificaciones']} ></Error> */}
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
        {/* <Error errors={error['Emp_Id_Convenio_fk']} ></Error> */}

        <br />
        <label >Url de convenio</label>
        <input type="url" name="Link Convenio" placeholder="Insertar url del convenio..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Link Convenio']}></input>
        {/* <Error errors={error['emp_link_convenio']} ></Error> */}
        <br />
        <label >Fecha de nacimiento</label>
        <input type="date" name="Fecha Nacimiento" placeholder="Insertar fecha de nacimiento..."  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Fecha Nacimiento']}></input>
        {/* <Error errors={error['emp_fechanac']} ></Error> */}
        <br />
        <label >Dias adicionales de trabajo</label>
        <input type="number" name="Dias extra" placeholder="Ejemplo : 0"  onChange={handleChangeEdit} value={empleadoSeleccionado && empleadoSeleccionado['Dias extra']}></input>
        {/* <Error errors={error['emp_dias_extra']} ></Error> */}
      <br /><br />
      <div align="right">
        <Button color="primary" onclick={() => actualizarEmpleado()}>Editar</Button>
        <Button onClick={() => abrircerrarModalEditar()}>Cancelar</Button>
      </div>
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
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Empleado',
            onClick: (event, rowData) => window.confirm('Estás seguro que deseas eliminar al artista: ' + rowData)
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
export default App;
// import React, { usestate, useEffect } from 'react';
// // import './App.css';
// import MaterialTable from "material-table";
// import axios from 'axios';
// import {Modal, TextField, Button} from '@material-ui/core';
// import {makestyles} from '@material-ui/core/styles';
// const columns= [
//   { title: 'Artista', field: 'artista' },
//    { title: 'País de Origen', field: 'pais' },
//    { title: 'Género(s)', field: 'genero' },
//    { title: 'Ventas Estimadas (millones)', field: 'ventas', type: 'numeric'}
// ];
// const baseurl="https://desarrollo.consigueventas.com/Backend/public/api/listarEmpleados";

// const usestyles = makestyles ((theme) => ({
//  modal: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxshadow: theme.shadows[5],
//     padding: theme. spacing(2, 4, 3),
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)'
//   },
//   iconos:{
//     cursor: 'pointer'
//   },
//   inputMaterial:{
//     width: '100%'
//   }
// }));
// function App() {
//   const styles= usestyles();
//   const [data, setData]= usestate([]);
//   const [modalInsertar, setModalInsertar]= usestate(false);
//   const [modalEditar, setModaleditar]= usestate(false);
//   const [modalEliminar, setModalEliminar]= usestate(false);
//   const [artistaseleccionado, setaArtistaseleccionado]=usestate({
//     artista: "",
//     genero:"",
//     id: "",
//     pais:"",
//     ventas:""
//   })
//   const handlechange=e=>{
//     const {name, value}=e.target;
//     setartistaseleccionado(prevstate=>({
//       ...prevstate,
//       [name]: value
//     }));
//   }
//   
//   const peticionPost=async()=>{
//     await axios.post(baseUrl, artistaseleccionado)
//     .then(response=>{
//       setData(data.concat (response.data));
//       abrircerrarModalInsertar();
//     }).catch(error=>{
//       console.log(error);
//     })
//   }
//   const peticionPut=async()=>{
//     await axios.put(baseurl+"/"+artistaseleccionado.id, artistaseleccionado)
//     .then(response=>{
//       var datanueva= data;
//       dataNueva.map(artista=>{
//          if(artista.id===artistaSeleccionado.id){
//            artista.artista=artistaseleccionado.artista;
//            artista.genero=artistaseleccionado.genero;
//            artista.ventas=artistaseleccionado.ventas;
//            artista.pais=artistaseleccionado.pais;
//          }
//        });
//       setData(datanueva);
//       abrircerrarModaleditar();
//     }).catch(error=>{
//       console.log(error);
//     })
//   }
//     const peticionDelete=async ()=>{
//       await axios.delete(baseurl+"/"+artistaseleccionado.id)
//       .then(response=>{
//         setData(data.filter(artista=>artista.id!==artistaseleccionado.id));
//         abrircerrarModaleliminar();
//       }).catch(error=>{
//         console.log(error);
//       })
//     }
//     const seleccionarArtista=(artista, caso)=>{
//       setArtistaseleccionado(artista);
//       (caso==="Editar")?abrircerrarModaleditar():
//       abrircerrarModaleliminar ()
//     }
//     const abrircerrarModalInsertar=()=>{
//       setModalInsertar(!modalInsertar);
//     }
//     const abrircerrarModalEditar=()=>{
//       setModalEditar (!modalEditar);
//     }
//     const abrircerrarModalEliminar=()=>{
//       setModalEliminar (!modalEliminar);
//     }
//     useEffect (()=>{
//       peticionGet();
//     }, [])
//     const bodyInsertar=(
//       <div className={styles.modal}>
//         <h3>Agregar Nuevo Artista</h3>
//         <TextField clasSName={styles.inputMaterial} label="Artista" name="artista" onchange={handlechange}/>
//         <br />
//         <TextField clasSName={styles.inputMaterial} label="Pais" name="pais" onchange={handlechange}/>
//     <br />
//     <TextField className={styles.inputMaterial} label="Ventas" name="ventas" onchange={handlechange}/>
//         <br />
//     <TextField className={styles.inputMaterial} label="Género" name="genero" onchange={handlechange}/>
//         <br /><br />
//         <div align="right">
//          <Button color="primary" onclick={()=>peticionPost()}>Insertar</Button>
//           <Button onclick={()=>abrircerrarModalInsertar()}>Cancelar</Button>
//         </div>
//       </div>
//     )
//     const bodyEditar=(
//       <div className={styles.modal}>
//         <h3>Editar Artista</h3>
//         <TextField className={styles.inputMaterial} label="Artista" name="artista" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.artista}/>
//         <br />
//         <TextField className={styles.inputMaterial} label="País" name="pais" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.pais}/>
//     <br />
//     <TextField className={styles.inputMaterial} label="Ventas" name="ventas" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.ventas}/>
//     <br />
//     <TextField className={styles.inputMaterial} label="Género" name="genero" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.genero}/>
//         <br /><br />
//         <div align="right">
//           <Button color="primary" onclick={()=>peticionPut ()}>Editar</Button>
//           <Button onclick={()=>abrircerrarModaleditar()}>Cancelar</Button>
//         </div>
//       </div>
//     )
//     const bodyEliminar=(
//       <div className={styles.modal}>
//         <p>Estás seguro que deseas eliminar al artista <b>{artistaseleccionado && artistaseleccionado.artista}</b>? </p>
//         <div align="right">
//           <Button color="secondary" onclick={()=>peticionDelete()}>Sí</Button>
//           <Button onclick={()=>abrircerrarModaleliminar()} >No</Button>
//         </div>
//       </div>
//       )
//       return (

//         <div className="App">
//           <br />
//           <Button onclick={()=>abrircerrarModalInsertar()}>Insertar Artista</Button>
//           <br /><br />
//           <MaterialTable
//               columns={columns}
//               data={data}
//               title="Artistas Musicales con Mayores Ventas"
//               actions={[
//                 {
//                   icon: 'edit',
//                   tooltip: 'Editar Artista',
//                   onclick: (event, rowData) => seleccionarArtista(rowData, "Editar")
//                 },
//                 {
//                   icon: 'delete',
//                   tooltip: 'Eliminar Artista',
//                   onclick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
//                 }
//               ]}
//               options={{
//                 actionsColumnIndex: -1,
//               }}
//               localization={{
//                 header:{
//                   actions: "Acciones"
//                 }
//               }}
//           />
//            <Modal open={modalInsertar} onClose={abrircerrarModalInsertar}>
//                 {bodyInsertar}
//             </Modal>
//             <Modal open={modaleditar} onclose={abrircerrarModalEditar}>
//                 {bodyEditar}
//             </Modal>
//             <Modal open={modalEliminar} onclose={abrircerrarModalEliminar}>
//                 {bodyEliminar}
//             </Modal>
//         </div>
//     );
// }
// export default App;