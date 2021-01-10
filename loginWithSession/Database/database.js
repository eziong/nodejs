var mongoose = require("mongoose");

var userModel = require("../Models/userModel");

var database = {};

database.init = function (app) {
    connectDB(app);
};

var connectDB = (app) => {
    var dbUrl = "mongodb://localhost:27017/sessionlogin";

    mongoose.connect(dbUrl);
    database.db = mongoose.connection;
    database.db.on("error", function () {
        console.error.bind(console, "mongoose connection error");
    });
    database.db.on("open", function () {
        console.log("Database is connected");
        database["UserModel"] = userModel;
    });
    app.set("database", database);
};

module.exports = database;
