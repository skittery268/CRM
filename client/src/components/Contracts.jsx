import { useContracts } from "../hooks/useContracts";

const Contracts = ({ client }) => {
    const { deleteContract, updateContract } = useContracts();

    const handleStatusChange = (contractId, newStatus) => {
        updateContract(client._id, contractId, { status: newStatus });
    }

    return (
        <section className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <h3 className="font-display text-lg font-bold text-slate-900">Contracts</h3>
            {
                client.contracts.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-600">No contracts yet.</p>
                ) : (
                    <div className="mt-3 grid gap-3">
                        {
                            client.contracts.map((contract, index) => {
                                return (
                                    <div key={index} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                                        <p className="text-sm font-bold text-slate-900">{contract.name}</p>
                                        <p className="mt-1 text-sm text-slate-600">{contract.description}</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800">${contract.price}</p>
                                        <button onClick={() => handleStatusChange(contract.id, contract.status === "active" ? "closed" : "active")} className={`cursor-pointer mt-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${contract.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                                            {contract.status}
                                        </button>
                                        <div>
                                            <button onClick={() => deleteContract(client._id, contract.id)} className="cursor-pointer mt-3 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                                                Delete Contract
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </section>
    )
}

export default Contracts;