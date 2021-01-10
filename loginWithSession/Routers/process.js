var express = require("express");

var { userInfo, authUser } = require("../Utils/user");

var router = express.Router();

router.post("/logIn", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (req.session.user) {
        console.log("already logged in!");
        res.render("home.html");
    } else {
        req.session.user = {
            email: email,
            password: password,
            authorized: true,
        };
        res.render("home.html");
    }
});

router.get("/signUp", function (req, res) {
    res.render("signUp.html");
});

router.post("/signUp", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var nickname = req.body.nickname;

    var database = req.app.get("database");
    if (database.db) {
        var user = new database.UserModel({
            u_email: email,
            u_password: password,
            u_nickname: nickname,
        });
        user.save(function (err) {
            if (err) {
                console.log(err);
                console.log("something is wrong signing up");
            } else {
                console.log("signed up successfully");
                console.log(user);
            }
        });
        res.redirect("/");
    }
});

module.exports = router;
