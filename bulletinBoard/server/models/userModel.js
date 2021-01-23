const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    user_email: {
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

userSchema.virtual("detail").get(() => {
    return `user_id:${this.user_id}, user_nickname:${this.user_nickname}`;
});

module.exports = mongoose.model("User", userSchema);
