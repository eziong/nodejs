var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("login.html");
});

router.get("/main", function (req, res, next) {
    const id = req.query.id;
    const pw = req.query.pw;
    if (id === "eziong" && pw == "1234") {
        res.render("main.html");
        console.log(req.query);
    } else {
        res.render("login.html");
        console.log("로그인 실패");
    }
});

router.get("/signup", function (req, res, next) {
    res.render("signup.html");
});

module.exports = router;
