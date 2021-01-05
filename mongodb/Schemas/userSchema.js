var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_pw: {
        type: String,
        required: true,
        lowercase: true,
    },
    user_nickname: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
