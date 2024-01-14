//SE DEFINE LA RUTA DEL "dotenv"
require("dotenv").config({ path: "../.env" });

//SE REQUIERE AXIOS
const axios = require("axios");

//SE REQUIERE EL TOKEN DE LA API
const token_api = process.env.TOKEN_API;

//APIS

//Acta de Nacimiento

function actaDeNacimiento(dni) {
  const apiUrl = `https://api.ddosis.fun/actanac?token=${token_api}&dni=${dni}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      console.log("Posible error en la API RENIEC");
      throw error;
    });
}

//C4 azul

function fichaC4Azul(dni) {
  const apiUrl = `https://api.ddosis.fun/c4azul?token=${token_api}&dni=${dni}`;

  return axios
    .get(apiUrl, { responseType: "arraybuffer" })
    .then((response) => {
      return Buffer.from(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.error("Error en la apiC4 azul");
      throw error;
    });
}

module.exports = { actaDeNacimiento, fichaC4Azul };
