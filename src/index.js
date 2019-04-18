const HTTP = require("http");/* Utilizacion de http para el servidor */
const PATH = require("path");/* Ruta de proyecto */
const EXPRESS = require("express");/* Creación de un servidor */
const SOCKETIO = require("socket.io");/* El servidor escucha en tiempo real. Mantiene la escucha */
const APP = EXPRESS();/* Iniciar el servidor express */
const SERVER = HTTP.createServer(APP);/* Crear servidor http */
const IO = SOCKETIO.listen(SERVER);/* Mantener la escucha */
const PORT = 3000;/* Puerto en el que se utilizara el servidor */
require("./socket")(IO);
APP.set("port", process.env.PORT || PORT)/* Establece el puerto */
APP.use(EXPRESS.static(PATH.join(__dirname, "public")));/* Establecer la pagina de inicio */
SERVER.listen(APP.get("port"), () => {
    /* El servidor esta a la escucha */
    console.log("Servidor en el puerto " + PORT);
});
