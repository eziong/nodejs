var express = require("express");

var { userInfo, authUser } = require("../utils/user");

var router = express.Router();

// router.post("*", function (req, res, next) {
//     console.log("/process/* url접속");
//     next;
// });

router.post("/logIn", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    console.log(email, password);

    authUser(req, res, email, password, function (err, isLoggedIn) {
        if (isLoggedIn === true) {
            console.log("login is successful");
            res.cookie("userInfo", {
                isLoggedIn: true,
            });
            res.redirect("/main");
        } else {
            res.cookie("userInfo", {
                isLoggedIn: false,
            });
            console.log("login is failed!");
            res.redirect("/main");
        }
    });
});

router.get("/signUp", function (req, res) {
    res.render("signUp.html");
});

router.post("/signingUp", function (req, res) {
    var database = req.app.get("database");
    var email = req.body.email;
    var nickname = req.body.nickname;
    var pw = req.body.password;
    if (database.db) {
        var user = new database.UserModel({
            u_email: email,
            u_nickname: nickname,
            u_password: pw,
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
