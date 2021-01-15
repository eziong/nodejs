var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jsonwebtoken = require("jsonwebtoken");
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

    if (user.isModified("password")) {
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
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
    const encryptedPassword = this.password;
    //check if plainPassword and encryptedPassword are same
    bcrypt.compare(plainPassword, encryptedPassword, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.generateToken = function (callback) {
    var user = this;
    //create token using jsonwebtoken
    var token = jsonwebtoken.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    user.save((err, user) => {
        if (err) return callback(err, null);
        callback(null, user);
    });
};

userSchema.statics.findByToken = function (token, callback) {
    var user = this;

    //decode token
    jsonwebtoken.verify(token, "secretToken", function (err, decoded) {
        //find user using user's id
        //check which are same token from db and token which is --
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return callback(err, null);
            callback(null, user);
        });
    });
};

module.exports = mongoose.model("User", userSchema);
