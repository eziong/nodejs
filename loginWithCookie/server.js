var http = require("http");
var app = require("./app");
var database = require("./Database/database");

app.set("port", 3000);

http.createServer(app).listen(app.get("port"), function () {
    console.log("server is running");
    database.init(app);
});

app.on("close", function () {
    console.log("application is closing...");
    if (database.db) {
        database.db.close();
    }
});
