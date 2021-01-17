var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var User = require("./models/User");
var config = require("./config/key");
var { auth } = require("./middleware/auth");

var app = express();

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err));

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.set("port", 5000);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/api/users/register", (req, res) => {
    var user = new User(req.body);
    console.log(user);

    user.save((err, docs) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, docs });
    });
});

app.post("/api/users/login", (req, res) => {
    //Email check
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "No user",
            });
        }
        //Password check
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "wrong password",
                });
            }

            //Create token
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //save token into where? // cookie, local storage, session ...
                //here, in cookie
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
    });
});

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
    });
});

app.get("/api/hello", (req, res) => {
    console.log("hihi");
    res.send("안녕하세요");
});

app.listen(app.get("port"), () => {
    console.log("server is running!");
});
