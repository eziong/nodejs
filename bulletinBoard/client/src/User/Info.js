import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function ManiPage() {
    const [toggle, setToggle] = useState(true);

    const onToggleHandler = () => {
        setToggle(!toggle);
    };
    const loginSwitch = () => {
        return <Login />;
    };
    const signupSwitch = () => {
        return <Signup />;
    };
    return (
        <div>
            {toggle ? loginSwitch() : signupSwitch()}
            <button onClick={onToggleHandler}>
                {toggle ? "Signup Page" : "Login Page"}
            </button>
        </div>
    );
}
