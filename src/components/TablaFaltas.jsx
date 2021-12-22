import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Modal, TextField, Button,Select,MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from "../components/Loading";
import { setToken, getToken } from "../dist/Token";
// import { Component } from 'react'
//import Select from 'react-select'


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '21rem',
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
    }
}));

const baseUrl = `${process.env.REACT_APP_API_URL}/api/`;

function TablaFaltas() {

    const [loading, setLoading] = useState(false);
    const cambiarEstado=()=>{
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
    }, 1000);
    }

    const styles = useStyles();
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);

    //filtros tabla
    const [selectArea, setSelectArea] = useState([]);
    const [selectUnidad, setUnidad] = useState([]);

    const [modalSeleccionarOptionar, setModalSeleccionarOptionar] = useState({
       // value:3, label: "Falta Justificada"
    });



    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
        Apellido: "",
        Dni: "",
        ['Estado Falta']: "",
        ['Fecha Falta']: "",
        Id: "",
        Nombre: "",
        Perfil: "",
        Turno: "",
        Unidad: "",
        cambio_estado: "",
    })

    //filtros tabla
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/unidades`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        )
          .then(response => {
            setUnidad(response.data.Unidades);
            //console.log(response)
          }).catch(error => {
          })
      }, [])
    
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
            //console.log(response)
          }).catch(error => {
          })
      }, [])

      let resultArea = selectArea.map(function(item,){      
        return  `"${item}":"${item}"` 
      });
      let resultArea2=JSON.parse(`{${resultArea}}`);
  
      let resultUnidad = selectUnidad.map(function(item,){      
        return  `"${item}":"${item}"` 
      });
      let resultUnidad2=JSON.parse(`{${resultUnidad}}`);
      const turnos={Mañana:'Mañana',Tarde:'Tarde', ['Mañana y tarde']:'Mañana y Tarde'};
      const estFalta={'Falta Justificada':'Falta Justificada','Falta Injustificada':'Falta Injustificada'};
    //


    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEmpleadoSeleccionado((prevState) => ({
          ...prevState,
          [name]: value
        }));
      }

    const handleChange = e => {
        const { name, value } = e.target;
        setEmpleadoSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const peticionGet = async () => {
        await axios.get(baseUrl + 'tabla_faltas',
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
            .then(response => {
                setData(response.data.data);
            }).catch(error => {
            })
    }






    const peticionPut = async () => {
        await axios.post(baseUrl + 'tabla_faltas/' + empleadoSeleccionado.Id,
            {
                "cambio_estado": empleadoSeleccionado['Estado Falta']
            },

            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
            .then(response => {
                // var dataNueva = data.concat(response.data);
                // data.map(empleado => {
                //     if (empleado.Id === empleadoSeleccionado.Id) {
                //         empleado['Estado Falta'] = empleadoSeleccionado['Estado Falta']
                //     }
                // });
                setData(data);
                peticionGet();
                abrirCerrarModalEditar();

            }).catch(error => {
            });
    }


    useEffect(() => {
        cambiarEstado();
        peticionGet();
    }, [])



    const seleccionarEmpleado = (empleado, caso) => {
        let empleadoEdit={...empleado};
        empleadoEdit['Estado Falta']==='Falta Justificada'?empleadoEdit['Estado Falta']=3:empleadoEdit['Estado Falta']=4;
        setEmpleadoSeleccionado(empleadoEdit);
        
        (caso === "Editar") && abrirCerrarModalEditar();
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const optiones =
        [
            { value: 3, label: "Falta Justificada" },
            { value: 4, label: "Falta Injustificada" },
        ]

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Editar Empleado</h3>
            <br />
            <Select style={{width:"99%"}} onChange={handleChangeEdit} id="Estado Falta" name="Estado Falta" label="Estado Falta" value={empleadoSeleccionado && empleadoSeleccionado['Estado Falta']} defaultMenuIsOpen={false} isSearchable={false}>
                <MenuItem value={3}>Falta Justificada</MenuItem>
                <MenuItem value={4}>Falta Injustificada</MenuItem>
            </Select>
            {/* <TextField className={styles.inputMaterial} label="Estado Falta" name="Estado Falta" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado['Estado Falta']} /> */}
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
                |
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
                
            </div>
        </div>
    )
    // const tableRef = React.createRef();
    if (loading) {
        return (<Loading />)
      }else{
    return (
        <div>

            <MaterialTable
                columns={[
                    {
                        title: 'Id',
                        field: 'Id',
                        sortable: true,
                        filtering: false
                    },
                    {
                        title: 'Nombres',
                        field: 'Nombre',
                        sortable: true,
                        filtering: false
                    },
                    {
                        title: 'Apellidos',
                        field: 'Apellido',
                        sortable: true,
                        filtering: false
                    },
                    {
                        title: 'Dni',
                        field: 'Dni',
                        sortable: true,
                        filtering: false
                    },
                    {
                        title: 'Perfil',
                        field: 'Perfil',
                        sortable: true,
                        lookup:resultArea2
                    },
                    {
                        title: 'Unidad',
                        field: 'Unidad',
                        sortable: true,
                        lookup:resultUnidad2
                    },
                    {
                        title: 'Turno',
                        field: 'Turno',
                        sortable: true,
                        lookup:turnos
                    },
                    {
                        title: 'Fecha de Falta',
                        field: 'Fecha Falta',
                        sortable: true,
                        filtering: false
                    },
                    {
                        title: 'Estado de Falta',
                        field: 'Estado Falta',
                        sortable: true,
                        lookup:estFalta
                    },
                ]}
                data={data}
                title="Tabla de Faltas"
                // tableRef={tableRef}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar faltas',
                        onClick: (event, rowData) => seleccionarEmpleado(rowData, "Editar")
                    },
                    // {
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
                        backgroundColor: '#E2E2E2  ',
                    },
                    exportButton: true,
                    actionsColumnIndex: -1,
                    
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

            < Modal open={modalEditar}
                onClose={abrirCerrarModalEditar} >
                {bodyEditar}
            </Modal >
        </div >


    );}
}
export default TablaFaltas;