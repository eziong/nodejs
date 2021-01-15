var User = require("../models/User");

let auth = (req, res, next) => {
    //인증처리
    //get token from client cookies
    let token = req.cookies.x_auth;
    //decrypt token and find user
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });
        req.token = token;
        req.user = user;
        next();
    });
    //if user is exist okay or no
};

module.exports = { auth };
