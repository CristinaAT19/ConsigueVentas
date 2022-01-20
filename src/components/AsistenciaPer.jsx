import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { setToken, getToken, removeToken } from "../dist/Token";
import { Doughnut } from 'react-chartjs-2';
import { UserContext } from './context/UserContext';
import Loading from '../components/Loading.jsx';
import { distSetAutentication } from '../dist/Autentication';


const AsistenciaPer = () => {

    const [puntualidadP, setPuntualidadP] = useState([]);
    const [v_puntualidadP, setV_PuntualidadP] = useState([]);
    const [tardanzaP, setTardanzaP] = useState([]);
    const [v_tardanzaP, setV_TardanzaP] = useState([]);
    const [faltas_inP, setFaltasInP] = useState([]);
    const [v_faltas_inP, setV_Faltas_inP] = useState([]);
    const [faltas_jusP, setFaltasJusP] = useState([]);
    const [v_faltas_jusP, setV_Faltas_jusP] = useState([]);
    const [feriados, setFeriados] = useState([]);
    const [v_feriados, setV_Feriados] = useState([]);


    const [c_feriado, setC_Feriado] = useState([]);
    const [vc_feriado, setVC_Feriado] = useState([]);
    const [nc_feriado, setNc_Feriado] = useState([]);
    const [vnc_feriado, setVnc_Feriado] = useState([]);

    const [dashboardDatos,setDashboardDatos] = useState([]);

    const [loading, setLoading] = useState(true);
    
    // Obtiene contexto
    const { user } = useContext(UserContext);

    const feriadosNC = feriados.filter( fer => fer.fer_tipoFeriado === 'N')
    const feriadosC = feriados.filter( fer => fer.fer_tipoFeriado === 'C')
    // console.log(feriadosC.length);
    const dataPersonal = {
        labels: [puntualidadP, tardanzaP, faltas_inP, faltas_jusP, nc_feriado, c_feriado],
        datasets: [{
            backgroundColor: ['#46CF35', '#DCD617', '#DA2020', '#51F7CF', '#0D7EEB', '#F2711B'],
            hoverBackgroundColor: ['#89de7e', '#e3df6f', '#c95959', '#88e3cd', '#3290EC', '#F08945'],
            data: [v_puntualidadP, v_tardanzaP, v_faltas_inP, v_faltas_jusP, vnc_feriado, vc_feriado],
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
                setC_Feriado(response.data.DashboardAsistencia[4].Estado);
                setVC_Feriado(response.data.DashboardAsistencia[4].Cantidad);
                setNc_Feriado(response.data.DashboardAsistencia[5].Estado);
                setVnc_Feriado(response.data.DashboardAsistencia[5].Cantidad);
            
            })
            .catch((e) => {
                if (e.response.status === 403) {
                    console.log("No tienes permisos para ver esta información");
                }
            });
    }

    // const peticionApiFeriados = async () => {
    //     await axios.get(`${process.env.REACT_APP_API_URL}/api/listarFeriados`,
    //       {
    //         headers: {
    
    //           Authorization: `Bearer ${getToken()}`
    
    //         }
    //       })
    //       .then(response => {
    //         setLoading(false);
    //         console.log(response.data);
    //         setFeriados(response.data.Feriados)
    //         setV_Feriados(response.data.Feriados.length)
    //       })
    //       .catch((e) => {
    //         if(e.response.status === 403){
    //           console.log("No tienes permisos para ver esta información");
    //         }
    //         if(e.response.status === 401){
    //           console.log("El token expiro o no te has aunteticado");
              
    //           distSetAutentication(false);
    //           removeToken();
    
    //         }
    //       });
    //   }

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
        // peticionApiFeriados()
    }, []);

    if (loading) {
        return <div className="flex justify-center align-center"><Loading /></div>
    }else{
        return (<Doughnut data={dataPersonal} options={opciones} />);
    }
}

export default AsistenciaPer
