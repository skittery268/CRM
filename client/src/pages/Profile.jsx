import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useClients } from "../hooks/useClients";
import { Link } from "react-router";

const Profile = () => {
    const { user } = useAuth();
    const { managerClients, deleteClient, changeClientInfo } = useClients();
    const [editedClientId, setEditedClientId] = useState(null);

    const handleSubmit = (e, cb) => {
        e.preventDefault();

        const data = {
            fullname: e.target.fullname.value,
            description: e.target.description.value,
            facebook: e.target.facebook.value,
            telegram: e.target.telegram.value,
            instagram: e.target.instagram.value,
            status: e.target.status.value
        }

        cb(editedClientId, data);
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
                                        <form onSubmit={(e) => { handleSubmit(e, changeClientInfo); setEditedClientId(null) }}>
                                            <input type="text" name="fullname" placeholder="Enter new fullname" />
                                            <br />
                                            <input type="text" name="description" placeholder="Enter new description" />
                                            <br />
                                            <input type="text" name="facebook" placeholder="Enter new Facebook URL" />
                                            <br />
                                            <input type="text" name="telegram" placeholder="Enter new Telegram URL" />
                                            <br />
                                            <input type="text" name="instagram" placeholder="Enter new Instagram URL" />
                                            <br />
                                            <label htmlFor="status">Select status</label>
                                            <select name="status" id="status">
                                                <option value="lead">Lead</option>
                                                <option value="in-progress">In-progress</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                            <br />
                                            <button type="submit">Save changes</button>
                                            <button type="button" onClick={() => setEditedClientId(null)}>Cancel</button>
                                        </form>
                                    ) : (
                                        <>
                                            <p>{client.fullname}</p>
                                            <p>{client.description}</p>
                                            <p>{client.status}</p>
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