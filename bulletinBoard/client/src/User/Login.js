import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../_actions/user_action";
import { useHistory } from "react-router";

export default function App() {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginInfo = useSelector((state) => {
        return state.user;
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            email: email,
            password: password,
        };
        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
                history.push("/login");
            } else {
                alert("Error");
            }
        });
    };

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };
    if (loginInfo.loginSuccess) {
        return (
            <div>
                <h2>Logined Page</h2>
                <h3>welcome {loginInfo.userInfo.user_nickname}</h3>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Login Page</h2>
                <form onSubmit={onSubmitHandler}>
                    <input
                        type="email"
                        value={email}
                        onChange={onEmailHandler}
                        placeholder="email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={onPasswordHandler}
                        placeholder="password"
                    />
                    <br />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}
