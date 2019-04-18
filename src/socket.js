module.exports = function(IO) {
    let nicknames = ['usuario', 'usuario2',];
    /**
	 * Establecer accion al conectarse
	 */
    IO.on("connection", socket => {
        socket.on("new user", (data, cb) => {
            if (nicknames.indexOf(data) != -1) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
            }
        });

        socket.on("send", function(data) {
            IO
                .sockets
                .emit("new message", data);
        });

    });
}
