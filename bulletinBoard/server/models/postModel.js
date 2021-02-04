const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
    post_head: {
        type: String,
        required: true,
    },
    post_detail: {
        type: String,
        required: true,
    },
    post_user: {
        type: String,
        required: true,
    },
    post_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);
