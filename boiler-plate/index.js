var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var User = require("./models/User");

var app = express();

mongoose
    .connect(
        "mongodb+srv://eziong:1q2w3e4r@cluster0.axn0r.mongodb.net/<dbname>?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err));

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

app.set("port", 3000);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/register", (req, res) => {
    var user = new User(req.body);

    user.save((err, docs) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, docs });
    });
});

app.listen(app.get("port"), () => {
    console.log("server is running!");
});
