import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: 'DashBoard',
    path: '/dashboard',
    icon: <IoIcons.IoMdPie />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Users',
    //     path: '/overview/users',
    //     // icon: <IoIcons.IoIosPaper />
    //   },
    //   {
    //     title: 'Revenue',
    //     path: '/overview/revenue',
    //     // icon: <IoIcons.IoIosPaper />
    //   }
    // ]
  },
  {
    title: 'Empleado',
    path: '/',
    icon: <BsIcons.BsPeopleFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Administracion de Empleados',
        path: '/administracionEmpleados',
        icon: <BsIcons.BsPersonPlusFill />,
        cName: 'sub-nav'
      },
      {
        title: 'Restablecimiento de Contraseña',
        path: '/restablecimientoContraseña',
        icon: <BsIcons.BsFillLockFill />,
        cName: 'sub-nav'
      },
      {
        title: 'Tabla Faltas',
        path: '/tablaFaltas',
        icon: <BiIcons.BiSpreadsheet />,
      },
      {
        title: 'Calendario de Empleados',
        path: '/calendarioEmpleados',
        icon: <IoIcons.IoMdCalendar />,
      },
      {
        title: 'Lista Administradores',
        path: '/listaAdministradores',
        icon: <BiIcons.BiSpreadsheet />,
      }
    ]
  },

  {
    title: 'Perfil',
    path: '/',
    icon: <FaIcons.FaUserCircle />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Calendario de Asistencia',
        path: '/calendarioAsistencia',
        icon: <IoIcons.IoMdCalendar />,
      },
      {
        title: 'Datos Personales',
        path: '/datosPersonales',
        icon: <BiIcons.BiSpreadsheet />,
      }
    ]
  },
  {
    title: 'Calendario General',
    path: '/calendarioGeneral',
    icon: <IoIcons.IoMdCalendar />,
  },
  {
    title: 'Cerrar sesion',
    path: '/cerrarSesion',
    icon: <IoIcons.IoMdCalendar />,
  }

];
