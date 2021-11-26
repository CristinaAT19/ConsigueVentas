import React, { useState, useEffect } from 'react'
import axios from "axios";
import { setToken, getToken } from "../dist/Token";
import { Doughnut } from 'react-chartjs-2';

const AsistenciaPer = () => {
    const [puntualidadP, setPuntualidadP] = useState([]);
    const [v_puntualidadP, setV_PuntualidadP] = useState([]);
    const [tardanzaP, setTardanzaP] = useState([]);
    const [v_tardanzaP, setV_TardanzaP] = useState([]);
    const [faltas_inP, setFaltasInP] = useState([]);
    const [v_faltas_inP, setV_Faltas_inP] = useState([]);
    const [faltas_jusP, setFaltasJusP] = useState([]);
    const [v_faltas_jusP, setV_Faltas_jusP] = useState([]);

    const dataPersonal = {
        labels: [puntualidadP, tardanzaP, faltas_inP, faltas_jusP],
        datasets: [{
            backgroundColor: ['green', 'yellow', 'red', 'blue'],
            hoverBackgroundColor: 'rgba(255,0,0,0.2)',
            data: [v_puntualidadP, v_tardanzaP, v_faltas_inP, v_faltas_jusP]
        }]
    };

    const peticionApiAsistenciaPersonal = async () => {
        await axios.get( `${process.env.REACT_APP_API_URL}/api/dashboardUsuario/73615048`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            .then(response => {

                setPuntualidadP(response.data.DashboardAsistencia[0].Estado);
                setV_PuntualidadP(response.data.DashboardAsistencia[0].Cantidad);
                setTardanzaP(response.data.DashboardAsistencia[1].Estado);
                setV_TardanzaP(response.data.DashboardAsistencia[1].Cantidad);
                setFaltasInP(response.data.DashboardAsistencia[2].Estado);
                setV_Faltas_inP(response.data.DashboardAsistencia[2].Cantidad);
                setFaltasJusP(response.data.DashboardAsistencia[3].Estado);
                setV_Faltas_jusP(response.data.DashboardAsistencia[3].Cantidad);
            })
    }

    const opciones = {
        maintainAspectRatio: false,
        responsive: true
    }
    useEffect(() => {
        peticionApiAsistenciaPersonal();

    }, [])

    return (
        <Doughnut data={dataPersonal} options={opciones} />
    )
}

export default AsistenciaPer
