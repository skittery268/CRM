import { useNavigate, useParams } from "react-router";
import { useClients } from "../hooks/useClients";
import { useState } from "react";
import { useEffect } from "react";

const Client = () => {
    const { clientId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const { changeClientInfo, deleteClient, getClient, client } = useClients();

    useEffect(() => {
        getClient(clientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId]);

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

        cb(clientId, data);
        e.target.reset();
    }

    return (
        <section>
            {
                isEditing ? (
                    <form onSubmit={(e) => { handleSubmit(e, changeClientInfo); setIsEditing(false) }}>
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
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                ) : (
                    <>
                        <h1>{client.fullname}</h1>
                        <p>{client.description}</p>
                        { client.facebook && <a href={client.facebook} target="_blank" rel="noreferrer">Facebook</a> }
                        { client.telegram && <a href={client.telegram} target="_blank" rel="noreferrer">Telegram</a> }
                        { client.instagram && <a href={client.instagram} target="_blank" rel="noreferrer">Instagram</a> }
                        <p>Status: {client.status}</p>
                        <button onClick={() => { deleteClient(clientId); navigate("/profile"); }}>Delete Client</button>
                        <button onClick={() => setIsEditing(true)}>Edit Client</button>
                    </>
                )
            }
        </section>
    )
}

export default Client;