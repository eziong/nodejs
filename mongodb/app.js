var express = require("express");
var bodyParser = require("body-parser");
var usersRouter = require("./users");

app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRouter);

app.get("/", function (req, res, next) {
    res.write("hello");
    res.end();
});

module.exports = app;
