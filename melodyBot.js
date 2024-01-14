const TelegramBot = require("node-telegram-bot-api");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

//CONFIG

const token_bot = process.env.TOKEN_BOT;
console.log(token_bot); // Muestra el token del bot
console.log("TOKEN_BOT:", process.env.TOKEN_BOT); // Muestra el token del bot también
console.log("Polling-test: ", TelegramBot); // Muestra información sobre TelegramBot
const bot = new TelegramBot(token_bot, { polling: true });

//BOT PRENDIDO

const axios = require("axios");
const express = require("express");
const app = express();
const PDFDocument = require("pdfkit");
const { DateTime } = require("luxon");
const moment = require("moment");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

bot
  .getMe()
  .then((user) => {
    console.log(`Bot prendido con nombre: @${user.username}`);
  })
  .catch((error) => {
    console.error("ERROR AL OBTENER INF. DEL BOT", error);
  });

//CREA LA CONSTANTE QUE DEFINE LA RUTA DE LA CARPETA "commands"
const commandsDir = path.join(__dirname, "commands");

//VERIFICA SI LA CARPETA "commands" existe
if (fs.existsSync(commandsDir)) {
  console.log("Carpeta de comandos detectada:", commandsDir + "\n");
} else {
  console.log("La carpeta de comandos no se encuentra en:", commandsDir + "\n");
}

//CARGA LOS COMANDOS DE LA CARPETA "commands"

//Defino la variable que leerá los archivos
const readFiles = fs.readdirSync(commandsDir);
//Ejecuto la lógica
readFiles.forEach((file) => {
  const commandPath = path.join(commandsDir, file);
  const command = require(commandPath);
  command(bot);
  console.log(readFiles);
  console.log(`Comando cargado: ${file}`);
});
