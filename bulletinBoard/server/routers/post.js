const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

router.get("/read", (req, res) => {
    Post.find({})
        .sort({ post_date: "asc" })
        .find((err, posts) => {
            if (err)
                return res.json({
                    success: false,
                });
            return res.json({
                success: true,
                docs: posts,
            });
        });
});

module.exports = router;
