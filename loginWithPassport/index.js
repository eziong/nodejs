var express = require("express");
var app = express();

var passport = require("passport");
var flash = require("express-flash");
var session = require("express-session");

const methodOverride = require("method-override");

const initializePassport = require("./passport-config");
initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id)
);

const users = [];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
    session({
        secret: "secrek key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("index.ejs", { name: req.user.name });
});
app.get("/login", (req, res) => {
    res.render("login.ejs");
});
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);
app.delete("/logout", (req, res) => {
    req.logOut(); // passport's function
    res.redirect("/login");
});
app.get("/register", (req, res) => {
    res.render("register.ejs");
});
app.post("/register", (req, res) => {
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    res.redirect("/login");
});

app.listen(3000);
