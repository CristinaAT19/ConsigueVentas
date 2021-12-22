import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import 'bootstrap/dist/css/bootstrap.css';
import bootstrapPlugin from "@fullcalendar/bootstrap";
import esLocale from '@fullcalendar/core/locales/es';
import { getToken } from "../dist/Token";
import { UserContext } from "./context/UserContext";
import listPlugin from '@fullcalendar/list';

const CalendarioPersonal = () => {
    const [valor, setValor] = useState([]);
    const {user} = useContext(UserContext)
    const [dniUtilizar, setDniUtilizar] = useState(user['dni']);
   
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
      });
  }
  useEffect(() => {
    peticionApiCalendarioPersonal();
  }, [])
////////////

    return (
        <div>
            <FullCalendar


                // plugins={[dayGridPlugin, bootstrapPlugin, listPlugin]}
                plugins={[dayGridPlugin, bootstrapPlugin, listPlugin]}
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
                    start: "prev,next,today",
                    center: "title",
                    end: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                dayHeaderFormat={{ weekday: "long" }}
            />
        </div>
    );
};

export default CalendarioPersonal;
