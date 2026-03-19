import { api } from "../api/axios"

export const fetchAllClients = () => {
    return api.get("/");
}

export const fetchClientById = id => {
    return api.get(`/${id}`);
}

export const fetchAddClient = data => {
    return api.post("/", data);
}

export const fetchDeleteClient = id => {
    return api.delete(`/${id}`);
}

export const fetchEditClient = (id, data) => {
    return api.patch(`/${id}`, data);
}
