var userInfo = function (req, res, email, callback) {
    var database = app.get("database");
    database.UserModel.findOne({ u_email: email }, function (err, result) {
        if (err) console.error(err);
        else callback(result);
    });
};

var authUser = function (req, res, email, pw, callback) {
    if (req.session.user) {
        callback(true);
    } else {
        userInfo(req, res, email, function (user) {
            if (user.u_email === email && user.u_password == pw) {
                console.log("login success");
                callback(true);
            } else {
                console.log("login failed");
                callback(false);
            }
        });
    }
};

module.exports.userInfo = userInfo;
module.exports.authUser = authUser;
