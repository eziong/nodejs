import { LOGIN_USER } from "../_actions/types";
import { useCookie } from "react-cookie";

const defaultState = {
    type: LOGIN_USER,
    loginSuccess: false,
    userInfo: null,
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload.loginSuccess,
                userInfo: action.payload.user_info,
            };
        default:
            return state;
    }
}
