import axios from "axios";
import { getToken } from "./Token";
//Peticion perfiles por id
export const getPeticionPerfilId = async (setData, id) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    })
    .then((Response) => {
      const { Marca, Area, SubArea } = Response.data.perfiles[0];
      setData({
        perfil: id,
        area: Area,
        subarea: SubArea,
      })
    })
    .catch((e) => { });
};
//Peticion data para perfiles
export const getPeticionPerfiles = async (setPerfiles, setLoading, setPerfilesTabla) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/perfil`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setPerfiles(Response.data.perfiles);
      setLoading(false);
      setPerfilesTabla(Response.data.perfiles.reduce(function (acc, cur, i) {
        acc[cur.perfil_Id] = cur.perfil_nombre;
        return acc;
      }, {}));
    })
    .catch((e) => { });
};
//Peticion Departamentos
export const getPeticionUnidades = async (setUnidades, setLoading, setIdUnidades =null) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/unidades`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setUnidades(Response.data.Unidades);
      setIdUnidades(Response.data.id);
      setLoading(false);
    })
    .catch((e) => { });
};
//Peticion Marca
export const getPeticionMarcas = async (setMarcas, setLoading) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/marcas`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setMarcas(Response.data.Marcas);
      setLoading(false);
    })
    .catch((e) => { });
};
//Peticion data para Areas con su id
export const getPeticionAreasEmpleado = async (setAreas, setLoading, setAreasTabla) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/api/areasEmpleados`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => {
      setAreas(Response.data.Areas);
      setLoading(false);
      setAreasTabla(Response.data.Areas.reduce(function (acc, cur, i) {
        acc[cur.Area_Id] = cur.Area_Nombre;
        return acc;
      }, {}));
    })
    .catch((e) => { });
};