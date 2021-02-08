import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { headerStyle, switchBtnStyle } from "../sytles/infoStyle";

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
        <div style={headerStyle}>
            <div>
                <button style={switchBtnStyle} onClick={onToggleHandler}>
                    {toggle ? "Signup Page" : "Login Page"}
                </button>
            </div>
            <div>{toggle ? loginSwitch() : signupSwitch()}</div>
        </div>
    );
}
