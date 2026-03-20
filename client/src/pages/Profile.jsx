import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useClients } from "../hooks/useClients";
import { Link } from "react-router";
import EditClient from "../components/EditClient";
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
        <section>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-300/30">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Manager Profile</p>
                <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">{user.name}</h1>
                <p className="mt-1 text-sm text-slate-600">{user.email}</p>
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold text-slate-900">Your Clients</h2>

            {
                managerClients.length === 0 ? (
                    <p className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">You have no clients yet.</p>
                ) : (
                    <div className="mt-4 grid gap-4">
                        {managerClients.map((client, index) => {
                            return (
                                <article key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-300/30">
                                {
                                    client._id === editedClientId ? (
                                        <EditClient editedClientId={editedClientId} setEditedClientId={setEditedClientId} />
                                    ) : (
                                        <>
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="font-display text-xl font-bold text-slate-900">{client.fullname}</h3>
                                                    <p className="mt-1 text-sm text-slate-600">{client.description}</p>
                                                </div>
                                                <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">{client.status}</p>
                                            </div>

                                            <form onSubmit={(e) => handleSubmit(e, client._id)} className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-3">
                                                <input type="text" name="name" placeholder="Contract name" required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
                                                <input type="text" name="description" placeholder="Contract description" required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
                                                <input type="number" name="price" placeholder="Price" required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
                                                <button type="submit" className="cursor-pointer md:col-span-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Add Contract</button>
                                            </form>

                                            <Contracts client={client} />

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <Link to={`/client/${client._id}`} className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">View Details</Link>
                                                <button onClick={() => deleteClient(client._id)} className="cursor-pointer rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">Delete Client</button>
                                                <button onClick={() => setEditedClientId(client._id)} className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Edit Client Info</button>
                                            </div>
                                        </>
                                    )
                                }
                                </article>
                        )
                    })}
                    </div>
                )
            }
        </section>
    )
}

export default Profile;