var http = require("http");
var app = require("./app");

app.set("port", 3000);

var server = http.createServer(app);

server.listen(3000);

module.exports = server;
