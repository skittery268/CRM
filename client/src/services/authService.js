import { api } from "../api/axios"

export const fetchLogin = data => {
    return api.post("/auth/login", data);
}

export const fetchRegister = data => {
    return api.post("/auth/register", data);
}

export const fetchLogout = () => {
    return api.delete("/auth/logout");
}

export const fetchGetMe = () => {
    return api.get("/auth/me");
}

