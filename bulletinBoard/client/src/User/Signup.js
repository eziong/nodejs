import axios from "axios";
import React, { useState } from "react";

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [nickname, setNickname] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };
    const onNicknameHandler = (e) => {
        setNickname(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    const onCpasswordHandler = (e) => {
        setCpassword(e.currentTarget.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            email: email,
            password: password,
            nickname: nickname,
        };
        axios
            .post("http://localhost:3000/authenticate/register", body)
            .then((response) => {
                console.log(response);
            });
    };

    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="email"
                    placeholder="email"
                    onChange={onEmailHandler}
                />
                <input
                    type="text"
                    placeholder="nickname"
                    onChange={onNicknameHandler}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={onPasswordHandler}
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    onChange={onCpasswordHandler}
                />
                <button>register</button>
            </form>
        </div>
    );
}
