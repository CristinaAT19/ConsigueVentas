import MaterialTable from "material-table";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { setToken, getToken } from "../dist/Token";
import axios from "axios";
import Loading from "../components/Loading.jsx";

const TablaAdmin = (cambio) => {
  const [tabla, setTabla] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectArea, setSelectArea] = useState([]);
  const [selectUnidad, setUnidad] = useState([]);
  
  const turnos={Mañana:'Mañana',Tarde:'Tarde', ['Mañana y tarde']:'Mañana y Tarde'};
  let resultArea = selectArea.map(function(item,){      
    return  `"${item}":"${item}"` 
  });
  let resultArea2=JSON.parse(`{${resultArea}}`);

  let resultUnidad = selectUnidad.map(function(item,){      
    return  `"${item}":"${item}"` 
  });
  let resultUnidad2=JSON.parse(`{${resultUnidad}}`);

  const peticionTablaAdmin = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/listarAdministrador`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((Response) => {
        setLoading(false);
        setTabla(Response.data.administradores);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    peticionTablaAdmin();
  }, []);
  useEffect(() => {
    peticionTablaAdmin();
  }, [cambio]);
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



    if (loading) {
      return <div className="flex justify-center align-center"><Loading /></div>
    }else{
  return (
    <div>
      <MaterialTable
        columns={[
          {
            title: "Nombres",
            field: "Nombre",
            filtering: false
          },
          {
            title: "Apellidos",
            field: "Apellido",
            filtering: false
          },
          {
            title: "DNI",
            field: "Dni",
            filtering: false
          },
          {
            title: "Turno",
            field: "Turno",
            lookup:turnos
          },
          {
            title: "Perfil",
            field: "Perfil",
            lookup:resultArea2
          },
          {
            title: "Unidad",
            field: "Unidad",
            lookup:resultUnidad2
          },

        ]}
        data={tabla}
        title="Tabla de administradores"
        options={{
          filtering: true,

          headerStyle: {
            backgroundColor: "#E2E2E2  ",
          },
          exportButton: true,
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
  );}
};

export default TablaAdmin;