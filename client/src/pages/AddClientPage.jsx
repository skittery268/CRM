import { useClients } from "../hooks/useClients";
import { useForm } from "../hooks/useForm";

const AddClientPage = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        fullname: "",
        description: "",
        facebook: "",
        telegram: "",
        instagram: "",
        status: "lead"
    })

    const { addClient } = useClients();

    return (
        <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/40">
            <h1 className="font-display text-3xl font-bold text-slate-900">Add New Client</h1>
            <p className="mt-2 text-sm text-slate-600">Fill in details to add a client to your pipeline.</p>

            <form onSubmit={(e) => { handleSubmit(e, addClient); resetForm(); }} className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                    <label htmlFor="fullname" className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
                    <input id="fullname" type="text" name="fullname" required value={formData.fullname} onChange={handleChange} placeholder="Enter client fullname" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
                    <input id="description" type="text" required name="description" value={formData.description} onChange={handleChange} placeholder="Enter client description" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                </div>

                <div>
                    <label htmlFor="facebook" className="mb-1 block text-sm font-semibold text-slate-700">Facebook</label>
                    <input id="facebook" type="text" required name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Facebook profile URL" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                </div>

                <div>
                    <label htmlFor="telegram" className="mb-1 block text-sm font-semibold text-slate-700">Telegram</label>
                    <input id="telegram" type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="Telegram profile URL" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                </div>

                <div>
                    <label htmlFor="instagram" className="mb-1 block text-sm font-semibold text-slate-700">Instagram</label>
                    <input id="instagram" type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram profile URL" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white" />
                </div>

                <div>
                    <label htmlFor="status" className="mb-1 block text-sm font-semibold text-slate-700">Client Status</label>
                    <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:bg-white">
                        <option value="lead">Lead</option>
                        <option value="in-progress">In-progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <button type="submit" className="cursor-pointer md:col-span-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700">
                    Add Client
                </button>
            </form>
        </section>
    )
}

export default AddClientPage;