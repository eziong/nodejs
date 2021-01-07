var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    u_email: {
        type: String,
        required: true,
        lowercase: true,
    },
    u_password: {
        type: String,
        required: true,
    },
    u_nickname: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
