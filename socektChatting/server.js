var http = require("http");
var app = require("./app");
var socketio = require("socket.io");

app.set("port", 3000);

var server = http.createServer(app).listen(app.get("port"), function () {
    console.log("server is connected");
});

// socket.io init
var io = socketio(server, function () {
    console.log("in the socket.io server");
});
console.log("ready to use socket.io");

io.sockets.on("connection", function (socket) {
    console.log(
        "connection info ->" +
            JSON.stringify(socket.request.connection._peername)
    );
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;

    socket.on("message", function (message) {
        console.log("message 받음 -> " + JSON.stringify(message));

        if (message.recepient == "ALL") {
            console.log("모든 클라이언트들에게 메세지 전송함");
            io.sockets.emit("message", message);
        }
    });
});

app.on("close", function () {
    console.log("server is terminated");
});
