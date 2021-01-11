var express = require("express");
var cors = require("cors");

var app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//===== app.use ======//
// cors init
app.use(cors());

app.get("/", function (req, res, next) {
    res.render("chatting.html");
});
module.exports = app;
