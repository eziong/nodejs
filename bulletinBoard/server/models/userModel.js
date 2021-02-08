const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    user_email: {
        type: String,
        required: true,
        unique: true,
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
userSchema.methods.comparePassword = function (password, callback) {
    const user = this;
    const user_password = this.user_pw;
    console.log(password, user_password);
    if (password === user_password) {
        return callback(true, user);
    } else {
        return callback(false, null);
    }
};

module.exports = mongoose.model("User", userSchema);
