const mongoose = require("mongoose");
const userModel = require("../models/userModel");

var database = {};

database.init = function (app) {
    connectDB(app);
};

const connectDB = (app) => {
    const dbUrl = "mongodb://localhost:27017/bulletinBoard1";

    mongoose.connect(dbUrl);
    database.db = mongoose.connection;
    database.db.on(
        "error",
        console.error.bind(console, "mongoose connection error")
    );
    database.db.on("open", () => {
        console.log("Database is connected");
        database["UserModel"] = userModel;
    });
    app.set("database", database);
};

module.exports = database;
