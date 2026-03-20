import { useContracts } from "../hooks/useContracts";

const Contracts = ({ client }) => {
    const { deleteContract, updateContract } = useContracts();

    const handleStatusChange = (contractId, newStatus) => {
        updateContract(client._id, contractId, { status: newStatus });
    }

    return (
        <>
            <h1>Contracts:</h1>
            {
                client.contracts.length === 0 ? (
                    <p>No contracts yet.</p>
                ) : (
                    <>
                        {
                            client.contracts.map((contract, index) => {
                                return (
                                    <div key={index}>
                                        <p>{contract.name}</p>
                                        <p>{contract.description}</p>
                                        <p>{contract.price}</p>
                                        <p onClick={() => handleStatusChange(contract.id, contract.status === "active" ? "closed" : "active")}>{contract.status}</p>
                                        <button onClick={() => deleteContract(client._id, contract.id)}>Delete Contract</button>
                                    </div>
                                )
                            })
                        }
                    </>
                )
            }
        </>
    )
}

export default Contracts;