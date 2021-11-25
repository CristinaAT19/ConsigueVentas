import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';



const AsistenciaMa = () => {
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




  const dataManana = {
    labels: [puntualidad, tardanza, faltas_in, faltas_jus, sin_marcar],
    datasets: [{
      backgroundColor: ['green', 'yellow', 'red', 'blue', 'gray'],
      hoverBackgroundColor: 'rgba(255,0,0,0.2)',
      data: [v_puntualidad, v_tardanza, v_faltas_in, v_faltas_jus, v_sin_marcar]
    }]
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }

  const peticionApiAsistenciaManana = async () => {
    await axios.get("https://desarrollo.consigueventas.com/Backend/public/api/dashboard_ma",
      {
        headers: {
          Authorization: "Bearer 677|brZgrPFNk78A3Ju7qsaDHWB7yPCoTVQkBseYZRvp"
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

  }
  useEffect(() => {
    peticionApiAsistenciaManana();
  }, [])
return (

    <Doughnut data={dataManana} options={opciones} />
  
    )}

export default AsistenciaMa;
