import React, { useState, useRef, useEffect} from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from '@fullcalendar/core/locales/es';
import 'bootstrap/dist/css/bootstrap.css';
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { getToken } from "../dist/Token";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxshadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
  },
  inputMaterial: {
    width: '30%'
  },
}));

const CalendarioEmpleados = () => {
  const styles = useStyles();


    const campo=useRef();
    const [valor, setValor] = useState([]);
    const [dniCalendario, setDniCalendario]= useState('');
    //const campo=document.getElementById("dni_calendario");

    const [dniEmpleado, setDniEmpleado]= useState('');
    const [nombreEmpleado, setNombreEmpleado]= useState('');
    const [turnoEmpleado, setTurnoEmpleado]= useState('');

    const onChangeDni = ()=>{
        setDniCalendario(campo.current.value);
        console.log(dniCalendario);
        //console.log(componenteInput.current.value);
    }
    const resetInputField = () => {
      setDniCalendario("");
    };

    const enviar = ()=>{
        peticionDatos();
        peticionApiCalendarioPersonal();
    }

    const peticionApiCalendarioPersonal = async () => {
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
  }

  const peticionDatos = async () => {
    const config = {
     headers: { Authorization: `Bearer 1062|VzYr7PB1AHPBvSuVjaPpGC9rIinTVjxxe7cCVwgd` }
    }
  
    const bodyParameters = {
     dni: dniCalendario
    };
  
   await axios.post(`${process.env.REACT_APP_API_URL}/api/mostrarTipoUsuario`, bodyParameters,config)
   .then((Response) => {
           //console.log(Response);
           setDniEmpleado('DNI: ' + Response.data.dni);
           setNombreEmpleado('NOMBRE: ' + Response.data.nombre+ ' ' + Response.data.apellido);
           setTurnoEmpleado('TURNO: ' + Response.data.turno);
           //console.log(tipoMostrar);
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
            <label className="mx-4"> Dni usuario:</label>
            {/* <TextField className={styles.inputMaterial}  onChange={onChangeDni} type="number" label="Dni Usuario:" name="dni_calendario" id="dni_calendario" ref={campo}/> */}
            <input onChange={onChangeDni} ref={campo} type="number" placeholder="dni" className={styles.inputMaterial} name="dni_calendario" id="dni_calendario" />
            <button  onClick={enviar} className="mx-4 bg-yellow-500 flex items-center justify-center w-28  h-1/5 border-solid border-2 border-black rounded-md hover:bg-red-700 hover:text-white px-3">
              Mostrar
            </button> 
            <input type="reset" value="reset" onClick={enviar} className="mx-4 bg-yellow-500 flex items-center justify-center w-28  h-1/5 border-solid border-2 border-black rounded-md hover:bg-red-700 hover:text-white px-3"/>
          </div>
          <br/> <br/>
            
            {dniEmpleado}
            {nombreEmpleado}
            {turnoEmpleado}
          
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
                locales={esLocale}
                locale="es"
                themeSystem='standard'
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