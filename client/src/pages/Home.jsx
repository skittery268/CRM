import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { user } = useAuth();

    return (
        <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/30 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">CRM Hub</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                {user ? `Hello, ${user.name}` : "A simple CRM for working with clients"}
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {user
                    ? "Here you can quickly open your profile, view clients, and add a new client to the system."
                    : "A convenient place to store clients, track their statuses, and manage contracts without extra complexity."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
                {user ? (
                    <>
                        <Link to="/profile" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">
                            Go to Profile
                        </Link>
                        <Link to="/addclient" className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                            Add Client
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">
                            Login
                        </Link>
                        <Link to="/register" className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </section>
    )
}

export default Home;