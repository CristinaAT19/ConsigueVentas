//Es para cambiar el valor cuando se logea
export const distSetAutentication = (valor) => {
  localStorage.setItem("Autentication", JSON.stringify(valor));
};

export const distGetAutentication = () => {
  return JSON.parse(localStorage.getItem("Autentication"));
};
