var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    if (req.session.user) {
        console.log("render to home.html");
        res.render("home.html");
    } else {
        console.log("not logged in yet");
        res.render("logIn.html");
    }
});

module.exports = router;
