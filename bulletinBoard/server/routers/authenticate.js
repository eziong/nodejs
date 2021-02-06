const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", (req, res) => {
    User.findOne({ user_email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "No user",
            });
        }
        user.comparePassword(req.body.password, (success, user) => {
            if (success)
                return res.json({
                    loginSuccess: true,
                    user_info: user,
                });
            else
                return res.json({
                    loginSuccess: false,
                    message: "wrong password",
                });
        });
    });
});

router.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    console.log(req.body);
    user = new User({
        user_email: email,
        user_pw: password,
        user_nickname: nickname,
    });
    console.log(user);
    user.save((err, docs) => {
        if (err) return res.json({ success: false });
        return res.json({ success: true });
    });
});

module.exports = router;
