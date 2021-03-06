const express = require("express");
const cors = require("cors");
const app = express();

const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const authenticateRouter = require("./routers/authenticate");
const postRouter = require("./routers/post");

const initializePassport = require("./config/passport-config");

const getUserByEmail = (id) => app.get("database").users.find({ _id: id });
const getUserById = (email) =>
    app.get("database").users.find({ user_email: email });

initializePassport(passport, getUserByEmail, getUserById);

app.set("port", 3000);

app.set("view-engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/authenticate", authenticateRouter);
app.use("/post", postRouter);

app.get("/testURI", (req, res) => {
    console.log("test URI");
    res.send("test");
});

module.exports = app;
