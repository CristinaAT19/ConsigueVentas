import React, { useState, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "bootstrap/dist/css/bootstrap.css";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Error from "../components/item/Error";
import { getToken } from "../dist/Token";
import esLocale from "@fullcalendar/core/locales/es";
import { MdCleaningServices } from "react-icons/md";
import CalendarioGeneral from "./CalendarioGeneral";
import listPlugin from "@fullcalendar/list";

const CalendarioEmpleados = () => {
  const campo = useRef();
  //const campo=document.getElementById("dni_calendario");
  const [error, setError] = useState([]);
  const [valor, setValor] = useState([]);
  const [dniCalendario, setDniCalendario] = useState("");

  const [dniEmpleado, setDniEmpleado] = useState("");
  const [nombreEmpleado, setNombreEmpleado] = useState("");
  const [turnoEmpleado, setTurnoEmpleado] = useState("");

  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [reporte, setReporte] = useState([]);

  const onChangeDni = () => {
    setDniCalendario(campo.current.value);
  };
  

  const limpiar = () => {
    campo.current.value = "";
    setDniCalendario("");
    setError([]);
    setValor([]);
    setDniEmpleado("");
    setNombreEmpleado("");
    setTurnoEmpleado("");
  };

  const peticionApiReporteAsistencia = async (dniUsuario) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/generarReporteAsistencia/${dniUsuario}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
          setReporte(response.data.data);
          console.log(response.data.data);
      }).catch((e) => {
        setReporte("error");
      });
      console.log(reporte)
  }

  const peticionDatosCalendario = async () => {
    if (isNaN(dniCalendario)) {
      const error = {
        dni: "El DNI debe ser un dato numérico",
      };
      setError(error);
      setValor([]);
      setDniEmpleado("");
      setNombreEmpleado("");
      setTurnoEmpleado("");
      return;
    }
    if (dniCalendario.length == 0) {
      const error = {
        dni: "El DNI es requerido",
      };
      setError(error);
      setValor([]);
      setDniEmpleado("");
      setNombreEmpleado("");
      setTurnoEmpleado("");
      return;
    }
    if (dniCalendario.length !== 8) {
      const error = {
        dni: "El DNI debe tener 8 números",
      };
      setError(error);
      setValor([]);
      setDniEmpleado("");
      setNombreEmpleado("");
      setTurnoEmpleado("");
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    const bodyParameters = {
      dni: dniCalendario,
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/mostrarTipoUsuario`,
        bodyParameters,
        config
      )
      .then((Response) => {
        //console.log(Response);
        //peticionDatos2();
        setError([]);
        if (Response.data.dni === undefined) {
          /*setDniEmpleado('El dni ingresado no se encuentra en la base de datos. Corregir');
            setNombreEmpleado('');
            setTurnoEmpleado('');*/
          const errorDni = {
            dni: "El DNI ingresado no se encuentra en la base de datos. Corregir",
          };
          setError(errorDni);
          setDniEmpleado("");
          setNombreEmpleado("");
          setTurnoEmpleado("");
        } else {
          //console.log(tipoMostrar);
          // Otra data del usuario
          peticionApiReporteAsistencia(dniCalendario);

          axios
            .get(
              `${process.env.REACT_APP_API_URL}/api/calendario/${dniCalendario}`,
              {
                headers: {
                  Authorization: `Bearer ${getToken()}`,
                },
              }
            )
            .then((response) => {
              //console.log(response.data.CalendarioAsistencia);
              setValor(response.data.CalendarioAsistencia);
            })
            .catch((e) => {
              setValor([]);
            });

          setDniEmpleado("DNI: " + Response.data.dni);
          setNombreEmpleado(
            "Nombre: " + Response.data.nombre + " " + Response.data.apellido
          );
          setTurnoEmpleado("Turno: " + Response.data.turno);
          setMostrarCalendario(true);
        }
      })
      .catch((e) => {
        setDniEmpleado("");
        setNombreEmpleado("");
        setTurnoEmpleado("");
      });
  };
  const onInputDni = () => {
    if (campo.current.value.length > 8) {
      campo.current.value = campo.current.value.slice(0, 8);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <input
          type="number"
          onInput={onInputDni}
          onChange={onChangeDni}
          ref={campo}
          placeholder="DNI del empleado"
          className="border-2 border-black-500 h-8 "
          style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
          name="dni_calendario"
          id="dni_calendario"
        />
        <button
          onClick={peticionDatosCalendario}
          className="flex items-center justify-center w-28 bg-yellow-500  border-solid border-2 border-black h-8"
          style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
        >
          Mostrar
        </button>
      </div>

      <div
        className="m-2 flex justify-center items-center transition-all"
        title="Limpiar datos"
      >
        {dniEmpleado && (
          <button
            onClick={limpiar}
            className=" flex items-center justify-center p-2 bg-yellow-500 h-8 border-solid border-2 border-black rounded-md"
          >
            <MdCleaningServices />
          </button>
        )}
      </div>
      <Error errors={error["dni"]}></Error>
      <div
        className="mx-auto my-4 text-2xl"
        style={{
          backgroundColor: "rgb(134 239 172)",
          borderRadius: "10px",
          width: "20rem",
        }}
      >
        <div className="w-full">{nombreEmpleado}</div>
        <div className="w-full">{dniEmpleado}</div>
        <div className="w-full">{turnoEmpleado}</div>
      </div>
      <div>
        {mostrarCalendario ? (
          <>
            <div style={{textAlign:"left"}}>
            {
                reporte.map((valor,i)=>{
                    return <li key={i}>{valor.Descripcion} : {valor.Cantidad}</li>;
                })
                }
            </div>
                <br />
            <FullCalendar
              plugins={[dayGridPlugin, bootstrapPlugin, listPlugin]}
              events={valor}
              height={"600px"}
              unselect={"false"}
              locales={esLocale}
              locale="es"
              themeSystem="standard"
              weekTextLong={"true"}
              firstDay={1}
              initialView="dayGridMonth"
              Forma
              headerToolbar={{
                start: "prev,next,today",
                center: "title",
                end: "listYear,dayGridMonth,dayGridWeek,dayGridDay",
              }}
              dayHeaderFormat={{ weekday: "long" }}
            />
            <div className="my-5">
              <h1 style={{ fontSize: "2rem" }}>
                Tabla de asistencias del empleado
              </h1>
              <CalendarioGeneral dniCalendario={dniCalendario} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CalendarioEmpleados;
