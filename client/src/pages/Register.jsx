import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const Register = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        name: "",
        email: "",
        password: ""
    })

    const { register } = useAuth();
    
    return (
        <form onSubmit={(e) => { handleSubmit(e, register); resetForm() }}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
            <br />
            <input type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} />
            <br />
            <input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
            <br />
            <button type="submit">Register</button>
        </form>
    )
}

export default Register;