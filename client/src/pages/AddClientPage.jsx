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
        <form onSubmit={(e) => { handleSubmit(e, addClient); resetForm(); }}>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter client fullname" />
            <br />
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Enter client description" />
            <br />
            <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Enter client Facebook" />
            <br />
            <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="Enter client Telegram" />
            <br />
            <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Enter client Instagram" />
            <br />
            <label htmlFor="status">Choose client status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
                <option value="lead">Lead</option>
                <option value="in-progress">In-progress</option>
                <option value="closed">Closed</option>
            </select>
            <br />
            <button type="submit">Add Client</button>
        </form>
    )
}

export default AddClientPage;