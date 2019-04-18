$(function() {
    const SOCKET = io(); //conexion en tiempo real
    const MESSAGEFORM = $("#message-form");
    const MESSAGE = $("#message");
    const CHAT = $("#chat");

    MESSAGEFORM.submit(e => {
        e.preventDefault();
        SOCKET.emit('send', MESSAGE.val());
        MESSAGE.val("");
    });

    SOCKET.on("new message", function(data) {
        CHAT.append(data + "<br/>");
    });
});
