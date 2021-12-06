import React, { useState, useEffect} from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import 'bootstrap/dist/css/bootstrap.css';
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { getToken } from "../dist/Token";

const CalendarioPersonal = () => {
    const [valor, setValor] = useState([]);
    const [dniUtilizar, setDniUtilizar] = useState('76634714');
    //por defecto sera el de localstorage
   
    const peticionApiCalendarioPersonal = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/calendario/${dniUtilizar}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
          //console.log(response.data.CalendarioAsistencia);
          setValor(response.data.CalendarioAsistencia);
      }).catch((e) => {
        setValor("error");
        console.log(e);
      });
  }
  useEffect(() => {
    peticionApiCalendarioPersonal();
  }, [])
////////////

    return (
        <div>
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

export default CalendarioPersonal;
