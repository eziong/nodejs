var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;

var userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 4,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre("save", function (next) {
    var user = this;
    console.log(user, this);

    // encrypt password
    bcrypt.genSalt(saltRounds, (err, salt) => {
        console.log(err);
        //Store hash in your password DB
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", userSchema);
