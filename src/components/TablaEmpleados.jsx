import React, { usestate, useEffect } from 'react';
// import './App.css';
import MaterialTable from "material-table";
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import {makestyles} from '@material-ui/core/styles';
const columns= [
  { title: 'Artista', field: 'artista' },
   { title: 'País de Origen', field: 'pais' },
   { title: 'Género(s)', field: 'genero' },
   { title: 'Ventas Estimadas (millones)', field: 'ventas', type: 'numeric'}
];
const baseurl="https://desarrollo.consigueventas.com/Backend/public/api/listarEmpleados";

const usestyles = makestyles ((theme) => ({
 modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme. spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  },
  inputMaterial:{
    width: '100%'
  }
}));
function App() {
  const styles= usestyles();
  const [data, setData]= usestate([]);
  const [modalInsertar, setModalInsertar]= usestate(false);
  const [modalEditar, setModaleditar]= usestate(false);
  const [modalEliminar, setModalEliminar]= usestate(false);
  const [artistaseleccionado, setaArtistaseleccionado]=usestate({
    artista: "",
    genero:"",
    id: "",
    pais:"",
    ventas:""
  })
  const handlechange=e=>{
    const {name, value}=e.target;
    setartistaseleccionado(prevstate=>({
      ...prevstate,
      [name]: value
    }));
  }
  const peticionGet=async ()=>{
    await axios.get(baseUrl)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPost=async()=>{
    await axios.post(baseUrl, artistaseleccionado)
    .then(response=>{
      setData(data.concat (response.data));
      abrircerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPut=async()=>{
    await axios.put(baseurl+"/"+artistaseleccionado.id, artistaseleccionado)
    .then(response=>{
      var datanueva= data;
      dataNueva.map(artista=>{
         if(artista.id===artistaSeleccionado.id){
           artista.artista=artistaseleccionado.artista;
           artista.genero=artistaseleccionado.genero;
           artista.ventas=artistaseleccionado.ventas;
           artista.pais=artistaseleccionado.pais;
         }
       });
      setData(datanueva);
      abrircerrarModaleditar();
    }).catch(error=>{
      console.log(error);
    })
  }
    const peticionDelete=async ()=>{
      await axios.delete(baseurl+"/"+artistaseleccionado.id)
      .then(response=>{
        setData(data.filter(artista=>artista.id!==artistaseleccionado.id));
        abrircerrarModaleliminar();
      }).catch(error=>{
        console.log(error);
      })
    }
    const seleccionarArtista=(artista, caso)=>{
      setArtistaseleccionado(artista);
      (caso==="Editar")?abrircerrarModaleditar():
      abrircerrarModaleliminar ()
    }
    const abrircerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
    const abrircerrarModalEditar=()=>{
      setModalEditar (!modalEditar);
    }
    const abrircerrarModalEliminar=()=>{
      setModalEliminar (!modalEliminar);
    }
    useEffect (()=>{
      peticionGet();
    }, [])
    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo Artista</h3>
        <TextField clasSName={styles.inputMaterial} label="Artista" name="artista" onchange={handlechange}/>
        <br />
        <TextField clasSName={styles.inputMaterial} label="Pais" name="pais" onchange={handlechange}/>
    <br />
    <TextField className={styles.inputMaterial} label="Ventas" name="ventas" onchange={handlechange}/>
        <br />
    <TextField className={styles.inputMaterial} label="Género" name="genero" onchange={handlechange}/>
        <br /><br />
        <div align="right">
         <Button color="primary" onclick={()=>peticionPost()}>Insertar</Button>
          <Button onclick={()=>abrircerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )
    const bodyEditar=(
      <div className={styles.modal}>
        <h3>Editar Artista</h3>
        <TextField className={styles.inputMaterial} label="Artista" name="artista" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.artista}/>
        <br />
        <TextField className={styles.inputMaterial} label="País" name="pais" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.pais}/>
    <br />
    <TextField className={styles.inputMaterial} label="Ventas" name="ventas" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.ventas}/>
    <br />
    <TextField className={styles.inputMaterial} label="Género" name="genero" onchange={handlechange} value={artistaseleccionado&&artistaseleccionado.genero}/>
        <br /><br />
        <div align="right">
          <Button color="primary" onclick={()=>peticionPut ()}>Editar</Button>
          <Button onclick={()=>abrircerrarModaleditar()}>Cancelar</Button>
        </div>
      </div>
    )
    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar al artista <b>{artistaseleccionado && artistaseleccionado.artista}</b>? </p>
        <div align="right">
          <Button color="secondary" onclick={()=>peticionDelete()}>Sí</Button>
          <Button onclick={()=>abrircerrarModaleliminar()} >No</Button>
        </div>
      </div>
      )
      return (

        <div className="App">
          <br />
          <Button onclick={()=>abrircerrarModalInsertar()}>Insertar Artista</Button>
          <br /><br />
          <MaterialTable
              columns={columns}
              data={data}
              title="Artistas Musicales con Mayores Ventas"
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar Artista',
                  onclick: (event, rowData) => seleccionarArtista(rowData, "Editar")
                },
                {
                  icon: 'delete',
                  tooltip: 'Eliminar Artista',
                  onclick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
                }
              ]}
              options={{
                actionsColumnIndex: -1,
              }}
              localization={{
                header:{
                  actions: "Acciones"
                }
              }}
          />
           <Modal open={modalInsertar} onClose={abrircerrarModalInsertar}>
                {bodyInsertar}
            </Modal>
            <Modal open={modaleditar} onclose={abrircerrarModalEditar}>
                {bodyEditar}
            </Modal>
            <Modal open={modalEliminar} onclose={abrircerrarModalEliminar}>
                {bodyEliminar}
            </Modal>
        </div>
    );
}
export default App;