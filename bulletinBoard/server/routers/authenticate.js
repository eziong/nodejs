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

module.exports = router;
