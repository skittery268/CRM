import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        email: "",
        password: ""
    })

    const { login } = useAuth();
    
    return (
        <form onSubmit={(e) => { handleSubmit(e, login); resetForm() }}>
            <input type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} />
            <br />
            <input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
            <br />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;