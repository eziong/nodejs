var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var processRouter = require("./Routers/process");
var mainRouter = require("./Routers/main");

var app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    session({
        secret: "my key", //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐
        //아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
        resave: true,
        saveUninitialized: true,
    })
);

app.use("/process", processRouter);
app.use("/main", mainRouter);

app.get("/", function (req, res, next) {
    res.redirect("/main");
});

module.exports = app;
