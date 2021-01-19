var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set("views", "./views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rooms = {};

app.get("/", (req, res) => {
    res.render("index.html", { rooms: rooms });
});

app.post("/room", (req, res) => {
    if (rooms[req.body.room] != null) {
        return res.redirect("/");
    }
    rooms[req.body.room] = { users: {} };
    res.redirect(req.body.room);
    //Send message that new room was created
    io.emit("room-created", req.body.room);
});

app.get("/:room", (req, res) => {
    if (rooms[req.params.room] == null) {
        return res.redirect("/");
    }
    res.render("room.html", { roomName: req.params.room });
});

server.listen(3000);

io.on("connection", (socket) => {
    socket.on("new-server", (room, name) => {
        socket.join(room);
        rooms[room].users[socket.id] = name;
        socket.to(room).broadcast.emit("user-connected", name);
    });

    socket.on("send-chat-message", (room, message) => {
        socket.to(room).broadcast.emit("chat-message", {
            message: message,
            name: rooms[room].users[socket.id],
        });
    });

    socket.on("disconnect", () => {
        getUserRooms(socket).forEach((room) => {
            socket
                .to(room)
                .broadcast.emit(
                    "user-disconnected",
                    rooms[room].users[socket.id]
                );
            delete rooms[room].users[socket.id];
        });
    });
});

function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
        if (room.users[socket.id] !== null) names.push(name);
        return names;
    }, []);
}
