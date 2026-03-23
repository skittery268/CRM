import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAddClient, fetchAllClients, fetchClientById, fetchDeleteClient, fetchEditClient, fetchManagerClients } from "../services/clientsService";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react-refresh/only-export-components
export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
    const [managerClients, setManagerClients] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const getAllClients = async () => {
            try {
                const res = await fetchAllClients();

                setClients(res.data.data.clients);
            } catch (err) {
                toast.error(err.response.message);
            }
        }

        const getManagerClients = async () => {
            try {
                const res = await fetchManagerClients();

                setManagerClients(res.data.data.clients);
            } catch (err) {
                toast.error(err.response.message);
            }
        }

        getAllClients();
        getManagerClients();
    }, [user]);

    const getClient = async id => {
        try {
            const res = await fetchClientById(id);

            setClient(res.data.data.client);
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    const addClient = async (client) => {
        try {
            const res = await fetchAddClient(client);

            if (res.data.data.newClient.managerId === user._id) {
                setManagerClients((prev) => [...prev, res.data.data.newClient]);
            }

            setClients((prev) => [...prev, res.data.data.newClient]);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    const deleteClient = async (id) => {
        try {
            const res = await fetchDeleteClient(id);

            setClients((prev) => prev.filter(client => client._id !== id));
            setManagerClients((prev) => prev.filter(client => client._id !== id));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    const changeClientInfo = async (id, data) => {
        try {
            const res = await fetchEditClient(id, data);

            if (res.data.data.client.managerId === user._id) {
                setManagerClients(prev => prev.map(client => client._id === id ? res.data.data.client : client));
            }

            setClients(prev => prev.map(client => client._id === id ? res.data.data.client : client));
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    return (
        <ClientContext.Provider value={{ clients, client, managerClients, setClients, setManagerClients, addClient, deleteClient, changeClientInfo, getClient }}>
            {children}
        </ClientContext.Provider>
    )
}
