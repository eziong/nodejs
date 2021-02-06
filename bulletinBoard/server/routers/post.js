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
router.post("/create", (req, res) => {
    const head = req.body.head;
    const detail = req.body.detail;
    const user = req.body.user;

    const post = new Post({
        post_head: head,
        post_detail: detail,
        post_user: user,
    });
    post.save((err, docs) => {
        if (err) return res.json({ success: false });
        return res.json({ success: true });
    });
});

module.exports = router;
