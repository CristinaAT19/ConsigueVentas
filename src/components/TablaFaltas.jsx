import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getToken } from "../dist/Token";
import Select from 'react-select'

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

const baseUrl = `${process.env.REACT_APP_API_URL}/api/`;

function TablaFaltas() {
    const styles = useStyles();
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalSeleccionarOptionar, setModalSeleccionarOptionar] = useState({
        value: "",
        label: "",
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



    const handleChange = e => {
        const { name, value } = e.target;
        setEmpleadoSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(empleadoSeleccionado);
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
                console.log(error);
            })
    }

    const peticionPut = async () => {

        await axios.post(baseUrl + 'tabla_faltas/' + empleadoSeleccionado.Id,
            {
                "cambio_estado": modalSeleccionarOptionar.value
            },

            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
            .then(response => {
                data.map(empleado => {
                    if (empleado.Id === empleadoSeleccionado.Id) {
                        empleado['Estado Falta'] = empleadoSeleccionado['Estado Falta']
                    }
                });
                setData(data);
                peticionGet();
                abrirCerrarModalEditar();

            }).catch(error => {
                console.log(error);
            });
        console.log(modalSeleccionarOptionar);
    }


    useEffect(() => {
        peticionGet();
    }, [])

    const limpiarFalta = () => {
        setModalSeleccionarOptionar(modalSeleccionarOptionar.value = "");
        setModalSeleccionarOptionar(modalSeleccionarOptionar.label = "");
    }



    const seleccionarEmpleado = (empleado, caso) => {
        setEmpleadoSeleccionado(empleado);
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
            <Select options={optiones} onChange={setModalSeleccionarOptionar}  placeholder={empleadoSeleccionado['Estado Falta']} defaultMenuIsOpen={false} isSearchable={false} >
            </Select>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
                |
            </div>
        </div>
    )
    // const tableRef = React.createRef();
    return (
        <div>

            <MaterialTable
                columns={[
                    {
                        title: 'Id',
                        field: 'Id',
                        sortable: true,
                        align: 'center'
                    },
                    {
                        title: 'Nombres',
                        field: 'Nombre',
                        sortable: true,
                        align: 'center'
                    },
                    {
                        title: 'Apellidos',
                        field: 'Apellido',
                        sortable: true,
                        align: 'center'
                    },
                    {
                        title: 'Dni',
                        field: 'Dni',
                        sortable: true,
                        align: 'center'
                    },
                    {
                        title: 'Perfil',
                        field: 'Perfil',
                        sortable: true,
                        align: 'center'
                    },
                    {
                        title: 'Unidad',
                        field: 'Unidad',
                        sortable: true,
                        align: 'center'
                    },
                    {
                        title: 'Turno',
                        field: 'Turno',
                        sortable: true,
                        align: 'center'
                    },
                    {
                        title: 'Fecha de Falta',
                        field: 'Fecha Falta',
                        sortable: true,
                        type: 'date',
                        align: 'center'
                    },
                    {
                        title: 'Estado de Falta',
                        field: 'Estado Falta',
                        sortable: true,
                        lookup: { ['Falta Justificada']: 'Falta Justicada', ['Falta Injustificada']: 'Falta Injusticada' }
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
                    headerStyle: {
                        backgroundColor: '#E2E2E2  ',
                    },
                    exportButton: true,
                    align: 'right',
                    // filtering: true,
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

            < Modal open={modalEditar}
                onClose={abrirCerrarModalEditar} >
                {bodyEditar}
            </Modal >
        </div >


    );
}
export default TablaFaltas;