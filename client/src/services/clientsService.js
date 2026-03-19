import { api } from "../api/axios"

export const fetchAllClients = () => {
    return api.get("/clients");
}

export const fetchClientById = id => {
    return api.get(`/clients/${id}`);
}

export const fetchManagerClients = () => {
    return api.get("/clients/managerclients");
}

export const fetchAddClient = data => {
    return api.post("/clients", data);
}

export const fetchDeleteClient = id => {
    return api.delete(`/clients/${id}`);
}

export const fetchEditClient = (id, data) => {
    return api.patch(`/clients/${id}`, data);
}
