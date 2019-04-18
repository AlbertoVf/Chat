$(function() {
    const SOCKET = io(); //conexion en tiempo real
    const MESSAGEFORM = $("#message-form");
    const MESSAGE = $("#message");
    const CHAT = $("#chat");

    const NICKFORM = $("#nickForm");
    const NICKNAME = $("#nickname");
    const NICKERROR = $("#nickError");
    const USERS = $("#usernames");

    MESSAGEFORM.submit(e => {
        e.preventDefault();
        SOCKET.emit('send', MESSAGE.val());
        MESSAGE.val("");
    });

    SOCKET.on("new message", function(data) {
        CHAT.append(data + "<br/>");
    });

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
