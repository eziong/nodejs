var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    if (req.cookies.userInfo === undefined) {
        console.log("not logged in yet");
        res.render("logIn.html");
    } else {
        if (req.cookies.userInfo.isLoggedIn === true) {
            console.log("render to home.html");
            res.render("home.html");
        } else {
            console.log("render to logIn.html");
            res.render("logIn.html");
        }
    }
});

module.exports = router;
