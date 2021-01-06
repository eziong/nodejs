const mongoose = require("mongoose");
var userSchema = require("./Schemas/userSchema");
var userModel = mongoose.model("User", userSchema);

var database = {};

database.init = function (app) {
    connectDB(app);
};

var connectDB = (app) => {
    var dbUrl = "mongodb://localhost:27017/test";
    //mongoose.Promise = global.Promise;   -> no longer use this sentance(global.Promise) after mongoose 5
    mongoose.connect(dbUrl);
    database.db = mongoose.connection;
    database.db.on(
        "error",
        console.error.bind(console, "mongoose connection error")
    );
    database.db.on("open", function () {
        console.log("Database is connected");
        database["UserModel"] = userModel;
    });
    app.set("database", database);
};

module.exports = database;
