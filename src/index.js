/**
 * Utilizacion de http para el servidor
 */
const HTTP = require( "http" );
/**
 * Ruta de proyecto
 * @type {[type]}
 */
const PATH = require( "path" );
/**
 * Creación de un servidor
 */
const EXPRESS = require( "express" );
/**
 * El servidor escucha en tiempo real. Mantiene la escucha
 */
const SOCKETIO = require( "socket.io" );
/**
 * Puerto en el que se utilizara el servidor
 */
const PORT = 3000;
/**
 * Iniciar el servidor express
 */
const APP = EXPRESS();
/**
 * Crear servidor http
 */
const SERVER = HTTP.createServer( APP );
/**
 * Mantener la escucha
 */
const IO = SOCKETIO.listen( SERVER );
/**
 * Establecer accion al conectarse
 */
IO.on( "connection", socket => {
    console.log( "nuevo usuario conectado" );
} );
/**
 * Establecer la pagina de inicio
 */
APP.use( EXPRESS.static( PATH.join( __dirname, "public" ) ) );
/**
 * El servidor esta a la escucha
 */
APP.listen( PORT, () => {
    console.log( "Servidor en el puerto " + PORT );
} );
