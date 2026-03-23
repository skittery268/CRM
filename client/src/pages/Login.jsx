import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const Login = () => {
    const [formData, handleChange, handleSubmit, resetForm] = useForm({
        email: "",
        password: ""
    })

    const { login } = useAuth();
    
    return (
        <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/40">
            <h1 className="font-display text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-600">Sign in to manage your clients and contracts.</p>

            <form onSubmit={(e) => { handleSubmit(e, login); resetForm() }} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="name@example.com"
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
                    />
                </div>

                <button type="submit" className="cursor-pointer w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700">
                    Login
                </button>
            </form>
        </section>
    )
}

export default Login;