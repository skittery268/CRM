import { createContext } from "react";
import { toast } from "react-toastify";
import { fetchAddContract, fetchDeleteContract, fetchUpdateContract } from "../services/contractService";
import { useClients } from "../hooks/useClients";

// eslint-disable-next-line react-refresh/only-export-components
export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const { setClients, setManagerClients } = useClients();

    const addContract = async (clientId, data) => {
        try {
            const res = await fetchAddContract(clientId, data);

            setManagerClients(prev => prev.map(client => client._id === res.data.data.client._id ? res.data.data.client : client));
            setClients(prev => prev.map(client => client._id === res.data.data.client._id ? res.data.data.client : client));

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    const deleteContract = async (clientId, contractId) => {
        try {
            const res = await fetchDeleteContract(clientId, contractId);

            setManagerClients(prev => prev.map(client => client._id === clientId ? res.data.data.client : client));
            setClients(prev => prev.map(client => client._id === clientId ? res.data.data.client : client));

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    const updateContract = async (clientId, contractId, data) => {
        try {
            const res = await fetchUpdateContract(clientId, contractId, data);

            setManagerClients(prev => prev.map(client => client._id === clientId ? res.data.data.client : client));
            setClients(prev => prev.map(client => client._id === clientId ? res.data.data.client : client));

            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    return (
        <ContractContext.Provider value={{ addContract, deleteContract, updateContract }}>
            {children}
        </ContractContext.Provider>
    )
}