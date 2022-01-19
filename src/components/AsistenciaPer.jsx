import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { setToken, getToken } from "../dist/Token";
import { Doughnut } from 'react-chartjs-2';
import { UserContext } from './context/UserContext';
import Loading from '../components/Loading.jsx';


const AsistenciaPer = () => {

    const [puntualidadP, setPuntualidadP] = useState([]);
    const [v_puntualidadP, setV_PuntualidadP] = useState([]);
    const [tardanzaP, setTardanzaP] = useState([]);
    const [v_tardanzaP, setV_TardanzaP] = useState([]);
    const [faltas_inP, setFaltasInP] = useState([]);
    const [v_faltas_inP, setV_Faltas_inP] = useState([]);
    const [faltas_jusP, setFaltasJusP] = useState([]);
    const [v_faltas_jusP, setV_Faltas_jusP] = useState([]);

    const [loading, setLoading] = useState(true);
    
    // Obtiene contexto
    const { user } = useContext(UserContext);
    
    const dataPersonal = {
        labels: [puntualidadP, tardanzaP, faltas_inP, faltas_jusP],
        datasets: [{
            backgroundColor: ['#46CF35', '#DCD617', '#DA2020', '#51F7CF'],
            hoverBackgroundColor: ['#89de7e', '#e3df6f', '#c95959', '#88e3cd', '#9c9c9c'],
            data: [v_puntualidadP, v_tardanzaP, v_faltas_inP, v_faltas_jusP],
            hoverOffset: 10
        }]
    };

    const peticionApiAsistenciaPersonal = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboardUsuario/${user['dni']}`,
            {
                headers: {

                    Authorization: `Bearer ${getToken()}`

                }
            })
            .then(response => {
                setLoading(false);
                setPuntualidadP(response.data.DashboardAsistencia[0].Estado);
                setV_PuntualidadP(response.data.DashboardAsistencia[0].Cantidad);
                setTardanzaP(response.data.DashboardAsistencia[1].Estado);
                setV_TardanzaP(response.data.DashboardAsistencia[1].Cantidad);
                setFaltasInP(response.data.DashboardAsistencia[2].Estado);
                setV_Faltas_inP(response.data.DashboardAsistencia[2].Cantidad);
                setFaltasJusP(response.data.DashboardAsistencia[3].Estado);
                setV_Faltas_jusP(response.data.DashboardAsistencia[3].Cantidad);
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    console.log("No tienes permisos para ver esta información");
                }
            });

    }

    const opciones = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            intersect: true,
            // enabled:false,
        }
    }
    useEffect(() => {
        peticionApiAsistenciaPersonal();
    }, []);

    if (loading) {
        return <div className="flex justify-center align-center"><Loading /></div>
    }else{
        return (<Doughnut data={dataPersonal} options={opciones} />);
    }
}

export default AsistenciaPer
