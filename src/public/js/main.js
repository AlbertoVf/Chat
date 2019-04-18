$(function() {
    const SOCKET = io(); //conexion en tiempo real

    /* VARIABLES DE LA INTERFAZ */

    //Registro de usuarios
    const NICKFORM = $("#nickForm"); //formulario de usuario
    const NICKNAME = $("#nickname"); //nombre del usuario
    const NICKERROR = $("#nickError"); //seccion de errores
    const USERS = $("#usernames"); //visual de usuarios registrados

    //Envio de mensajes
    const MESSAGEFORM = $("#message-form"); //formulario de mensaje
    const MESSAGE = $("#message"); //contenido del mensaje
    const CHAT = $("#chat"); //seccion para visualizar los mensajes

    /**
	 * Actualiza la visual de los mensajes mostrando usuario: mensaje
	 * @param  {object} data Contenido del mensaje
	 * @return {HTML}      visual del mensaje
	 */
    SOCKET.on("new message", function(data) {
        CHAT.append("<b>" + data.nick + ":</b> " + data.msg + "<br/>");
    });

    /**
	 * Actualiza la visual de la lista de usuarios
	 * @type {HTML}
	 */
    SOCKET.on("usernames", data => {
        let html = "";
        for (var i = 0; i < data.length; i++) {
            html += "<p class='user'><i class='fas fa-user'> </i>" + data[i] + "</p>";
        }
        USERS.html(html);
    });

    /**
	 * Accion al enviar un mensaje. Envia el contenido del mensaje y limpia el campo.
	 * @type {void}
	 */
    MESSAGEFORM.submit(e => {
        e.preventDefault();
        SOCKET.emit('send', MESSAGE.val());
        MESSAGE.val("");
    });

    /**
	 * Visual para comprobar la existencia de un usuario
	 * @type {HTML} cambia la vista si el usuario es valido. Si el usuario no es valido muestra un mensaje de error
	 */
    NICKFORM.submit(e => {
        e.preventDefault();
        SOCKET.emit("new user", NICKNAME.val(), data => {
            if (data) {
                $("#nickWrap").hide();
                $("#contentWrap").show();
            } else {
                NICKERROR.html('<div class="alert alert-danger">El usuario ya existe.</div>')
            }
            NICKNAME.val("");
        });
    });
});
