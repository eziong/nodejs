var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("login.html");
});

router.post("/", function (req, res, next) {
    var database = req.app.get("database");
    var user_id = req.body.id;
    var user_pw = req.body.pw;
    var user_nickname = req.body.nickname;
    if (database.db) {
        var user = new database.UserModel({
            user_id: user_id,
            user_pw: user_pw,
            user_nickname: user_nickname,
        });
        user.save(function (err) {
            if (err) {
                console.log("saving error");
                res.render("login.html");
            } else {
                console.log("saving data successfully");
                res.cookie("user", {
                    id: user_id,
                    nickname: user_nickname,
                    pw: user_pw,
                    isLoginned: true,
                });
                console.log("cookie setting is good");
                res.redirect("/process/login");
            }
        });
    }
});

router.get("/main", function (req, res, next) {
    const id = req.cookies.user.id;
    const pw = req.cookies.user.pw;
    console.log(id, pw);
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
