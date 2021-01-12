var express = require("express");
var mongoose = require("mongoose");

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

app.set("port", 3000);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(app.get("port"), () => {
    console.log("server is running!");
});
