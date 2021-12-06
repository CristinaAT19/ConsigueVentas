//Es para cambiar el valor cuando se logea
export const distSetAutentication = (valor) => {
  localStorage.setItem("Autentication", JSON.stringify(valor));
};

export const distGetAutentication = () => {
  return JSON.parse(localStorage.getItem("Autentication"));
};

// Datos del usuario
export const distSetUser = (valor) => {
  localStorage.setItem("User", JSON.stringify(valor));
}

export const distGetUser = () => {
  return JSON.parse(localStorage.getItem("User"));
}
