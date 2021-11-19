import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Pie } from 'react-chartjs-2';

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


    const dataTarde = {
        labels: [puntualidadT, tardanzaT, faltas_inT, faltas_jusT, sin_marcarT],
        datasets: [{
            backgroundColor: ['green', 'yellow', 'red', 'blue', 'gray'],
            borderColor: 'black',
            borderwidth: 1,
            hoverBackgroundColor: 'rgba(255,0,0,0.2)',
            haverBorderColor: 'blue',
            data: [v_puntualidadT, v_tardanzaT, v_faltas_inT, v_faltas_jusT, v_sin_marcarT]
        }]
    };

    const opciones = {
        maintainAspectRatio: false,
        responsive: true
    }
    const peticionApiAsistenciaTarde = async () => {
        await axios.get("https://desarrollo.consigueventas.com/Backend/public/api/dashboard_ta",
            {
                headers: {
                    Authorization: "Bearer 512|0D12MIeenUZaCOR2PKTtw0yPm363WLU52uBBqnBA"
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
    }
    useEffect(() => {
        peticionApiAsistenciaTarde();
    }, [])
    return (

        <Pie data={dataTarde} options={opciones} />

    )
}

export default AsistenciaTarde
