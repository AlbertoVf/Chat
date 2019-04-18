module.exports = function(IO) {
    /**
	 * Establecer accion al conectarse
	 */
    IO.on("connection", socket => {
        console.log("nuevo usuario conectado");
        socket.on("send", function(data) {
            IO
                .sockets
                .emit("new message", data);
        });
    });
}
