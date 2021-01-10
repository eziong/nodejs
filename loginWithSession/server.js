var http = require("http");
var database = require("./Database/database");

var app = require("./app");

app.set("port", 3000);

http.createServer(app).listen(app.get("port"), function () {
    console.log("server is running");
    database.init(app);
});

app.on("close", function () {
    console.log("application is going to terminate");
    if (database.db) {
        database.db.close();
    }
});
