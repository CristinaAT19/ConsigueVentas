import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setToken, getToken } from "../dist/Token";
import Error from "../components/item/Error";
import Loading from "../components/Loading";
import Success from './item/Sucess';
import { calcularEdad,calcularDiferenciaDias,calcularDiferenciaDiasFechaActual } from '../helpers/fecha';
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
  const styles = useStyles();
  // 
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [sucess, setSucess] = useState(false);

  // 
  const [empleado, setEmpleado] = useState({});
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    Id: "",
    Nombres: "",
    Apellidos: "",
    Turno: "",
  })

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

  const abrircerrarModalInsertar = () => {

    setModalInsertar(!modalInsertar);
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
    if (diffDiasActual < 0  || isNaN(diffDiasActual)) {
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
        "emp_Fec_fin_prueba": "La diferencia de dias tiene que ser mayor a 10" ,
      }
      setError(errorVal);
      setLoading(false);
      return ;
    }

    // Validacion edad 
    if (edad < 18  || isNaN(edad)) {
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
            onClick: (event, rowData) => alert('Has presionado editar al artista: ' + rowData.empleados)
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Empleado',
            onClick: (event, rowData) => window.confirm('Estás seguro que deseas eliminar al artista: ' + rowData.empleados)
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