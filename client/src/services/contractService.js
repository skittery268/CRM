import { api } from "../api/axios"

export const fetchAddContract = (clientId, data) => {
    return api.post(`/contracts/${clientId}`, data);
}

export const fetchDeleteContract = (clientId, contractId) => {
    return api.delete(`/contracts/${clientId}/${contractId}`);
}

export const fetchUpdateContract = (clientId, contractId, data) => {
    return api.patch(`/contracts/${clientId}/${contractId}`, data);
}