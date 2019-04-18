module.exports = function ( IO ) {
    /**
	 * Establecer accion al conectarse
	 */
    IO.on( "connection", socket => {
        console.log( "nuevo usuario conectado" );
    } );
}
