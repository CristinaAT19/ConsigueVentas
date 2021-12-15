import React, { useState, useEffect } from 'react'
import axios from "axios";
// import { Pie } from 'react-chartjs-2';
import { getToken, removeToken } from '../dist/Token';
import { Doughnut } from 'react-chartjs-2';
import CerrarSesion from './CerrarSesion';
import { distSetAutentication } from '../dist/Autentication';
import Loading from "../components/Loading.jsx";

const AsistenciaTarde = () => {
    /*tarde*/
    const [puntualidadT, setPuntualidadT] = useState([]);
    const [v_puntualidadT, setV_PuntualidadT] = useState([]);
    const [tardanzaT, setTardanzaT] = useState([]);
    const [v_tardanzaT, setV_TardanzaT] = useState([]);
    const [faltas_inT, setFaltasInT] = useState([]);
    const [v_faltas_inT, setV_Faltas_inT] = useState([]);
    const [faltas_jusT, setFaltasJusT] = useState([]);
    const [v_faltas_jusT, setV_Faltas_jusT] = useState([]);
    const [sin_marcarT, setSin_marT] = useState([]);
    const [v_sin_marcarT, setV_sin_marT] = useState([]);

    const [loading, setLoading] = useState(false);

    const cambiarEstado=()=>{
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }


    const dataTarde = {
        labels: [puntualidadT, tardanzaT, faltas_inT, faltas_jusT, sin_marcarT],
        datasets: [{

            backgroundColor: ['green', 'yellow', 'red', 'blue', 'gray'],
            hoverBackgroundColor: 'rgba(255,0,0,0.2)',
            data: [v_puntualidadT, v_tardanzaT, v_faltas_inT, v_faltas_jusT, v_sin_marcarT]
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
    const peticionApiAsistenciaTarde = async () => {


        await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard_ta`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            .then(response => {
                setPuntualidadT(response.data.puntualidad);
                setV_PuntualidadT(response.data.v_puntualidad);
                setTardanzaT(response.data.tardanza);
                setV_TardanzaT(response.data.v_tardanza);
                setFaltasInT(response.data.faltas_in);
                setV_Faltas_inT(response.data.v_faltas_in);
                setFaltasJusT(response.data.faltas_jus);
                setV_Faltas_jusT(response.data.v_faltas_jus);
                setSin_marT(response.data.sin_marcar);
                setV_sin_marT(response.data.v_sin_marcar);
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    console.log("No tienes permisos para ver esta información");
                } 
                if(e.response.status === 401){
                    console.log("El token expiro");
                    distSetAutentication(false);
                    removeToken();          
                }
                  
            });

    }
    useEffect(() => {
        peticionApiAsistenciaTarde();
        cambiarEstado();
    }, [])

    if (loading) {
        return (<Loading />)
    }else{
        return (< Doughnut data={dataTarde} options={opciones} />);
    }
}

export default AsistenciaTarde
