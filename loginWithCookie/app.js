var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var processRouter = require("./Routers/process");
var mainRouter = require("./Routers/main");

var app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/process", processRouter);
app.use("/main", mainRouter);

app.get("/", function (req, res, next) {
    res.render("logIn.html");
});

module.exports = app;
