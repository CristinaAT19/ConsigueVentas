import React, { useState, useEffect } from 'react'
import axios from "axios";
// import { Pie } from 'react-chartjs-2';
import { setToken, getToken, removeToken } from "../dist/Token";
import { Doughnut } from 'react-chartjs-2';
import CerrarSesion from './CerrarSesion';
import { distSetAutentication } from '../dist/Autentication';
import Loading from "../components/Loading.jsx";


const AsistenciaMaTa = () => {
  /*mañana*/
  const [puntualidad, setPuntualidad] = useState([]);
  const [v_puntualidad, setV_Puntualidad] = useState([]);
  const [tardanza, setTardanza] = useState([]);
  const [v_tardanza, setV_Tardanza] = useState([]);
  const [faltas_in, setFaltasIn] = useState([]);
  const [v_faltas_in, setV_Faltas_in] = useState([]);
  const [faltas_jus, setFaltasJus] = useState([]);
  const [v_faltas_jus, setV_Faltas_jus] = useState([]);
  const [sin_marcar, setSin_mar] = useState([]);
  const [v_sin_marcar, setV_sin_mar] = useState([]);

  const [loading, setLoading] = useState(false);

  const cambiarEstado=()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }


  const dataManana = {
    labels: [puntualidad, tardanza, faltas_in, faltas_jus, sin_marcar],
    datasets: [{
      backgroundColor: ['#46CF35', '#DCD617', '#DA2020', '#51F7CF', 'gray'],
      hoverBackgroundColor: ['#89de7e', '#e3df6f', '#c95959', '#88e3cd', '#9c9c9c'],
      data: [v_puntualidad, v_tardanza, v_faltas_in, v_faltas_jus, v_sin_marcar],
      hoverOffset: 10
    }]
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      intersect: true,
      // enabled:false,
  }
  }

  const peticionApiAsistenciaManana = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard_ma_ta`,
      {
        headers: {

          Authorization: `Bearer ${getToken()}`

        }
      })
      .then(response => {
        setPuntualidad(response.data.puntualidad);
        setV_Puntualidad(response.data.v_puntualidad);
        setTardanza(response.data.tardanza);
        setV_Tardanza(response.data.v_tardanza);
        setFaltasIn(response.data.faltas_in);
        setV_Faltas_in(response.data.v_faltas_in);
        setFaltasJus(response.data.faltas_jus);
        setV_Faltas_jus(response.data.v_faltas_jus);
        setSin_mar(response.data.sin_marcar);
        setV_sin_mar(response.data.v_sin_marcar);
      })
      .catch((e) => {
        if(e.response.status === 403){
          console.log("No tienes permisos para ver esta información");
        }

        if(e.response.status === 401){
          console.log("El token expiro o no te has aunteticado");
          
          distSetAutentication(false);
          removeToken();

        }
      });

  }
  useEffect(() => {
    peticionApiAsistenciaManana();
    cambiarEstado();
  }, [])
  if (loading) {
    return (<Loading />)
  }else{
    return (< Doughnut data={dataManana} options={opciones} />);
  }
}
export default AsistenciaMaTa;
