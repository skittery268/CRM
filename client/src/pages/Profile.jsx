import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useClients } from "../hooks/useClients";
import { Link } from "react-router";
import EditClient from "../components/editClient";
import Contracts from "../components/Contracts";
import { useContracts } from "../hooks/useContracts";

const Profile = () => {
    const { user } = useAuth();
    const { managerClients, deleteClient } = useClients();
    const [editedClientId, setEditedClientId] = useState(null);
    const { addContract } = useContracts();

    const handleSubmit = (e, clientId) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            description: e.target.description.value,
            price: e.target.price.value
        }

        addContract(clientId, data);
        e.target.reset();
    }

    return (
        <>
            <p>{user.name}</p>
            <p>{user.email}</p>

            <h2>Your Clients:</h2>
            {
                managerClients.length === 0 ? (
                    <p>You have no clients yet.</p>
                ) : (
                    managerClients.map((client, index) => {
                        return (
                            <div key={index}>
                                {
                                    client._id === editedClientId ? (
                                        <EditClient editedClientId={editedClientId} setEditedClientId={setEditedClientId} />
                                    ) : (
                                        <>
                                            <p>{client.fullname}</p>
                                            <p>{client.description}</p>
                                            <p>{client.status}</p>
                                            <form onSubmit={(e) => handleSubmit(e, client._id)}>
                                                <input type="text" name="name" placeholder="Enter contract name" required />
                                                <br />
                                                <input type="text" name="description" placeholder="Enter contract description" required />
                                                <br />
                                                <input type="number" name="price" placeholder="Enter contract price" required />
                                                <br />
                                                <button type="submit">Add Contract</button>
                                            </form>

                                            <Contracts client={client} />

                                            <Link to={`/client/${client._id}`}>View Details</Link>
                                            <button onClick={() => deleteClient(client._id)}>Delete client</button>
                                            <button onClick={() => setEditedClientId(client._id)}>Edit Client Info</button>
                                        </>
                                    )
                                }
                            </div>
                        )
                    })
                )
            }
        </>
    )
}

export default Profile;