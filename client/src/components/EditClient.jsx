import { useClients } from "../hooks/useClients";

const EditClient = ({ editedClientId, setEditedClientId }) => {
    const { changeClientInfo } = useClients();

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
        <form onSubmit={(e) => { handleSubmit(e, changeClientInfo); setEditedClientId(null) }} className="grid gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
            <input type="text" name="fullname" placeholder="Enter new fullname" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
            <input type="text" name="description" placeholder="Enter new description" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
            <input type="text" name="facebook" placeholder="Enter new Facebook URL" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
            <input type="text" name="telegram" placeholder="Enter new Telegram URL" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
            <input type="text" name="instagram" placeholder="Enter new Instagram URL" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600" />
            <div>
                <label htmlFor="status" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Select status</label>
                <select name="status" id="status" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600">
                    <option value="lead">Lead</option>
                    <option value="in-progress">In-progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>
            <div className="flex flex-wrap gap-2">
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Save changes</button>
                <button type="button" onClick={() => setEditedClientId(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancel</button>
            </div>
        </form>
    )
}

export default EditClient;