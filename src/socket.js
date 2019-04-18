module.exports = function(IO) {
    let nicknames = []; //lista de usuarios
    /**
	 * Actualiza la lista de usuarios
	 * @return {void} Lista actualizada de los usuarios en linea
	 */
    function updateNicknames() {
        IO
            .sockets
            .emit("usernames", nicknames);
    }
    /**
	 * Establece una nueva conexion xon un usuario
	 * @type {void} Envio de mensajes y lista de los usuarios conectados
	 */
    IO.on("connection", socket => {
        socket.on("new user", (data, cb) => {
            if (nicknames.indexOf(data) != -1) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
                updateNicknames();
            }
        });

        /**
		 * Envio de mensajes
		 * @param  {object} data Contenido del mensaje
		 * @return {object}      Nuevo mensaje con el contenido y el usuario
		 */
        socket.on("send", function(data) {
            IO
                .sockets
                .emit("new message", {
                    msg: data,
                    nick: socket.nickname
                });
        });
        /**
		 * Accion al desconectarse un usuario
		 * @type {void} Actualiza la lista de usuarios
		 */
        socket.on("disconect", data => {
            if (!socket.nickname) 
                return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            updateNicknames();
        });

    });
}
