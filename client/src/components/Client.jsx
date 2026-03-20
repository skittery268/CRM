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
        <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/40">
            {
                isEditing ? (
                    <form onSubmit={(e) => { handleSubmit(e, changeClientInfo); setIsEditing(false) }} className="grid gap-3">
                        <h2 className="font-display text-2xl font-bold text-slate-900">Edit Client</h2>
                        <input type="text" name="fullname" placeholder="Enter new fullname" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                        <input type="text" name="description" placeholder="Enter new description" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                        <input type="text" name="facebook" placeholder="Enter new Facebook URL" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                        <input type="text" name="telegram" placeholder="Enter new Telegram URL" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                        <input type="text" name="instagram" placeholder="Enter new Instagram URL" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                        <div>
                            <label htmlFor="status" className="mb-1 block text-sm font-semibold text-slate-700">Select status</label>
                            <select name="status" id="status" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white">
                                <option value="lead">Lead</option>
                                <option value="in-progress">In-progress</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                            <button type="submit" className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Save changes</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h1 className="font-display text-3xl font-bold text-slate-900">{client.fullname || "Client Details"}</h1>
                        <p className="mt-2 text-sm text-slate-600">{client.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            { client.facebook && <a className="cursor-pointer rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" href={client.facebook} target="_blank" rel="noreferrer">Facebook</a> }
                            { client.telegram && <a className="cursor-pointer rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" href={client.telegram} target="_blank" rel="noreferrer">Telegram</a> }
                            { client.instagram && <a className="cursor-pointer rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" href={client.instagram} target="_blank" rel="noreferrer">Instagram</a> }
                        </div>

                        <p className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">Status: {client.status}</p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <button onClick={() => { deleteClient(clientId); navigate("/profile"); }} className="cursor-pointer rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">Delete Client</button>
                            <button onClick={() => setIsEditing(true)} className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700">Edit Client</button>
                        </div>
                    </>
                )
            }
        </section>
    )
}

export default Client;