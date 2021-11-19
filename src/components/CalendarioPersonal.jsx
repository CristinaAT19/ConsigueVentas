import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import 'bootstrap/dist/css/bootstrap.css';
import bootstrapPlugin from "@fullcalendar/bootstrap";
const CalendarioPersonal = () => {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, bootstrapPlugin]}
                events="http://localhost:3000/evento"
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
