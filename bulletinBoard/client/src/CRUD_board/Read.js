import React, { useEffect, useState } from "react";

const axios = require("axios").default;

export default function ManiPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let getPosts = [];
        axios
            .get("http://localhost:3000/post/read")
            .then((response) => {
                response.data.docs.map((post) => {
                    getPosts = [...getPosts, post];
                });
            })
            .then(() => {
                setPosts(getPosts);
            });
    }, []);
    const Post = ({ post }) => {
        return (
            <li>
                {post.post_head}
                {post.post_detail}
                {post.post_user}
            </li>
        );
    };
    return (
        <div>
            <ul>
                {posts.map((post, index) => {
                    console.log(index);
                    return <Post key={index} post={post} />;
                })}
            </ul>
        </div>
    );
}
