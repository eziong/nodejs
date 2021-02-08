import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(data) {
    const request = axios
        .post("http://localhost:3000/authenticate/login", data)
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
    return {
        type: LOGIN_USER,
        payload: request,
    };
}
