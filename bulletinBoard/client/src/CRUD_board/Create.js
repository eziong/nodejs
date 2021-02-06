import axios from "axios";
import React, { useState } from "react";

export default function App() {
    const [head, setHead] = useState("");
    const [detail, setDetail] = useState("");

    const onHeadHandler = (e) => {
        setHead(e.currentTarget.value);
    };
    const onDetailHandler = (e) => {
        setDetail(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            head: head,
            detail: detail,
            user: "test",
        };
        axios
            .post("http://localhost:3000/post/create", body)
            .then((response) => {
                console.log(response);
            });
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    placeholder="head"
                    onChange={onHeadHandler}
                />
                <input
                    type="text"
                    placeholder="detail"
                    onChange={onDetailHandler}
                />
                <button>post</button>
            </form>
        </div>
    );
}
