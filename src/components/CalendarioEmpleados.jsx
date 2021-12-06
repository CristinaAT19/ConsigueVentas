import React, { useState, useRef} from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import 'bootstrap/dist/css/bootstrap.css';
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Error from "../components/item/Error";
import { getToken } from "../dist/Token";


const CalendarioEmpleados = () => {
    const campo=useRef();
    //const campo=document.getElementById("dni_calendario");
    const [error, setError] = useState([]);
    const [valor, setValor] = useState([]);
    const [dniCalendario, setDniCalendario]= useState('');
    
    const [dniEmpleado, setDniEmpleado]= useState('');
    const [nombreEmpleado, setNombreEmpleado]= useState('');
    const [turnoEmpleado, setTurnoEmpleado]= useState('');

    const onChangeDni = ()=>{
        setDniCalendario(campo.current.value);
        console.log(dniCalendario);
        //console.log(componenteInput.current.value);
    }

    /*const enviar = ()=>{
        //peticionDatos();
        //peticionApiCalendarioPersonal();
    }*/

    const limpiar = async ()=>{
            campo.current.value='';
            setDniCalendario('');
            setError([]); 
            setValor([]);
            setDniEmpleado('');
            setNombreEmpleado('');
            setTurnoEmpleado(''); 
  }

  /*  const peticionApiCalendarioPersonal = async () => { 
        if(isNaN(dniCalendario)){
            const error = {
                "dni": "El dni debe ser un dato numerico",
            };
            setError(error); 
            setValor([]);
            setDniEmpleado('');
            setNombreEmpleado('');
            setTurnoEmpleado(''); 
            return;
          }
      
           if(dniCalendario.length !== 8){
            const error = {
                "dni": "El dni debe tener 8 numeros",
            };
            setError(error);
            setValor([]); 
           setDniEmpleado('');
           setNombreEmpleado('');
           setTurnoEmpleado('');
            return;
          }
    await axios.get(`${process.env.REACT_APP_API_URL}/api/calendario/${dniCalendario}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
          //console.log(response.data.CalendarioAsistencia);
          setValor(response.data.CalendarioAsistencia);
      }).catch((e) => {
        setValor([]);
        console.log(e);
      });
  }*/

  const peticionDatos = async () => {
    if(isNaN(dniCalendario)){
        const error = {
            "dni": "El dni debe ser un dato numerico",
        };
        setError(error);  
        setValor([]); 
        setDniEmpleado('');
        setNombreEmpleado('');
        setTurnoEmpleado('');
        return;
      }
  
       if(dniCalendario.length !== 8){
        const error = {
            "dni": "El dni debe tener 8 numeros",
        };
        setError(error);
        setValor([]); 
        setDniEmpleado('');
           setNombreEmpleado('');
           setTurnoEmpleado('');
        return;
      }
    const config = {
     headers: { Authorization: `Bearer ${getToken()}` }
    }
  
    const bodyParameters = {
     dni: dniCalendario
    };

   await axios.post(`${process.env.REACT_APP_API_URL}/api/mostrarTipoUsuario`, bodyParameters,config)
   .then((Response) => {
           //console.log(Response);
           setError([]);
           if(Response.data.dni === undefined){
            setDniEmpleado('El dni ingresado no se encuentra en la base de datos. Corregir');
           } else {
           setDniEmpleado('DNI: ' + Response.data.dni);
           setNombreEmpleado('NOMBRE: ' + Response.data.nombre+ ' ' + Response.data.apellido);
           setTurnoEmpleado('TURNO: ' + Response.data.turno);
           //console.log(tipoMostrar);
           }
       })
       .catch((e) => {
         console.log(e);
           setDniEmpleado('');
           setNombreEmpleado('');
           setTurnoEmpleado('');
       }); 

    /////////////////////
    await axios.get(`${process.env.REACT_APP_API_URL}/api/calendario/${dniCalendario}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    .then(response => {
        //console.log(response.data.CalendarioAsistencia);
        setValor(response.data.CalendarioAsistencia);
    }).catch((e) => {
      setValor([]);
      console.log(e);
    });
    ////////////////////
  }

    return (
        <div>
            <label> Dni usuario:   </label>
              <input onChange={onChangeDni} ref={campo} type="number" placeholder="dni" className="border-2 border-black-500" name="dni_calendario" id="dni_calendario" />
              <button  onClick={peticionDatos} className="flex items-center justify-center w-28 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
                  Mostrar
              </button> 
              <button  onClick={limpiar} className="flex items-center justify-center w-28 bg-yellow-500 h-1/5 border-solid border-2 border-black rounded-md">
                  Limpiar
              </button> <br/> <br/>
            <Error errors={error['dni']} ></Error> <br/>
            {dniEmpleado} <br/>
            {nombreEmpleado}<br/>
            {turnoEmpleado}<br/> <br/>
            <br/> <br/>
            <FullCalendar
                plugins={[dayGridPlugin, bootstrapPlugin]}
                /*events={[
                    { start: '2021-12-01',
                    title: "Tardanza:08:26",
                    color: "#DCD617",
                    textColor: "black" }
                  ]}*/
                events={valor}
                height={"600px"}
                unselect={"false"}
                locale="Es"
                themeSystem="bootstrap"
                weekTextLong={"true"}
                firstDay={1}
                initialView="dayGridMonth"
                Forma
                headerToolbar={{
                    start: "prev,next,prevYear,nextYear,today",
                    center: "title",
                    end: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                dayHeaderFormat={{ weekday: "long" }}
            />
        </div>
    );
};

export default CalendarioEmpleados;