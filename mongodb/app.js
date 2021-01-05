var express = require("express");
var usersRouter = require("./users");

app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use("/users", usersRouter);

app.get("/", function (req, res, next) {
    res.write("hello");
    res.end();
});

module.exports = app;
