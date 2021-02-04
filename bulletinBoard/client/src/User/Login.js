import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";

export default function App(props) {
    const dispatch = useDispatch();

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
                props.history.push("/");
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
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}
