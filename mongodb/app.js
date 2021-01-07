var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var usersRouter = require("./users");
var processRouter = require("./process");

app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/process", processRouter);

app.get("/", function (req, res, next) {
    res.write("hello");
    res.end();
});

module.exports = app;
