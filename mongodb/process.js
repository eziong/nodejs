var express = require("express");

var router = express.Router();

router.get("/", function (req, res, next) {
    console.log("in process router");
    next;
});

router.get("/login", function (req, res, next) {
    console.log("/process/login");
    console.log(req.cookies);
    console.log(req.cookies.user.isLoginned);
    if (req.cookies.user.isLoginned === true) {
        res.redirect("/users/main");
    } else {
        console.log("login failed");
        res.redirect("/users/login");
    }
});

module.exports = router;
