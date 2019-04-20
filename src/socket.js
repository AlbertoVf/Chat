const CHAT = require("./model/Chat");
module.exports = function(IO) {
    let users = {}; //lista de usuarios
    /**
     * Actualiza la lista de usuarios
     * @return {void} Lista actualizada de los usuarios en linea
     */
    function updateNicknames() {
        IO
            .sockets
            .emit("usernames", Object.keys(users));
    }
    /**
     * Establece una nueva conexion con un usuario
     * @type {void} Envio de mensajes y lista de los usuarios conectados
     */
    IO.on("connection", async socket => {
        let messages = await CHAT
            .find({})
            .limit(8)
            .sort('-created');
        socket.emit('load old msgs', messages);

        socket.on("new user", (data, cb) => {
            if (data in users) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNicknames();
            }
        });

        /**
         * Envio de mensajes
		 * @param  {object} data Contenido del mensaje
         * @param  {function} cb Funcion de retorno si hay error
         * @return {object}      Nuevo mensaje con el contenido y el usuario
         */
        socket.on('send', async (data, cb) => {
            var msg = data.trim();

            if (msg.substr(0, 3) === '/w ') {
                msg = msg.substr(3);
                var index = msg.indexOf(' ');
                if (index !== -1) {
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index + 1);
                    if (name in users) {
                        users[name].emit('whisper', {msg, nick: socket.nickname});
                    } else {
                        cb('Error! Introduce usuario valido');
                    }
                } else {
                    cb('Error! Introduce tu mensage');
                }
            } else {
                var newMsg = new CHAT({msg, nick: socket.nickname});
                await newMsg.save();
                IO
                    .sockets
                    .emit('new message', {msg, nick: socket.nickname});
            }
        });
        /**
         * Accion al desconectarse un usuario
         * @type {void} Actualiza la lista de usuarios
         */
        socket.on("disconect", data => {
            if (!socket.nickname) 
                return;
            delete users[socket.nickname];
            updateNicknames();
        });
    });
};
