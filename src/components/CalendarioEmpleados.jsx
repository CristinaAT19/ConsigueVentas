import React, { useState, useRef} from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import 'bootstrap/dist/css/bootstrap.css';
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Error from "../components/item/Error";
import { getToken } from "../dist/Token";
import esLocale from '@fullcalendar/core/locales/es';
import { MdCleaningServices} from "react-icons/md";


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

    const limpiar = ()=>{
            campo.current.value='';
            setDniCalendario('');
            setError([]); 
            setValor([]);
            setDniEmpleado('');
            setNombreEmpleado('');
            setTurnoEmpleado(''); 
    }



  const peticionDatosCalendario = async () => {
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
           //peticionDatos2();
           setError([]);
           if(Response.data.dni === undefined){
            /*setDniEmpleado('El dni ingresado no se encuentra en la base de datos. Corregir');
            setNombreEmpleado('');
            setTurnoEmpleado('');*/
            const errorDni = {
              "dni": "El dni ingresado no se encuentra en la base de datos. Corregir",
            };
            setError(errorDni);
            setDniEmpleado('');
            setNombreEmpleado('');
            setTurnoEmpleado('');
          } else {          
           //console.log(tipoMostrar);

           axios.get(`${process.env.REACT_APP_API_URL}/api/calendario/${dniCalendario}`,
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

                setDniEmpleado('DNI: ' + Response.data.dni);
                setNombreEmpleado('NOMBRE: ' + Response.data.nombre+ ' ' + Response.data.apellido);
                setTurnoEmpleado('TURNO: ' + Response.data.turno);
           }
       })
       .catch((e) => {
         console.log(e);
           setDniEmpleado('');
           setNombreEmpleado('');
           setTurnoEmpleado('');
       }); 


  }
    return (
        <div>
          <div className="flex justify-center items-center">
              <input onChange={onChangeDni} ref={campo} type="number" placeholder="Dni de empleado"  className="border-2 border-black-500 h-8 " style={{borderRadius:"0.5rem 0 0 0.5rem"}} name="dni_calendario" id="dni_calendario" />
              <button  onClick={peticionDatosCalendario} className="flex items-center justify-center w-28 bg-yellow-500  border-solid border-2 border-black h-8" style={{borderRadius:"0 0.5rem 0.5rem 0"}}>
                  Mostrar
              </button> 
          </div>

          <div className="m-2 flex justify-center items-center transition-all" title="Limpiar datos">
              { dniEmpleado&&<button onClick={limpiar} className=" flex items-center justify-center p-2 bg-yellow-500 h-8 border-solid border-2 border-black rounded-md" >
              <MdCleaningServices/>
              </button>}
          </div>
            <Error errors={error['dni']} ></Error>
            <div className="m-4 w-1/5 flex flex-col justify-around items-center text-2xl">
              <div>{nombreEmpleado}</div>
              <div>{dniEmpleado}</div>
              <div>{turnoEmpleado}</div>

            </div>
          <div>
          <FullCalendar
                plugins={[dayGridPlugin, bootstrapPlugin]}

                  events={valor}
                  height={"600px"}
                  unselect={"false"}
                  locales={esLocale}
                  locale="es"
                  themeSystem='standard'
                  weekTextLong={"true"}
                  firstDay={1}
                  initialView="dayGridMonth"
                  Forma
                  headerToolbar={{
                      start: "prev,next,today",
                      center: "title",
                      end: "dayGridMonth,dayGridWeek,dayGridDay",
                  }}
                  dayHeaderFormat={{ weekday: "long" }}
            />
          </div>
            
        </div>
    );
};

export default CalendarioEmpleados;