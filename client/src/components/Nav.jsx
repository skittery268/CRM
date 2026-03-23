import { Link, NavLink } from "react-router"
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
    const { user, logout } = useAuth();

    const linkClasses = ({ isActive }) =>
        `rounded-xl px-4 py-2 text-sm font-semibold transition ${
            isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-700 hover:bg-slate-100"
        }`;

    return (
        <header className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-md shadow-slate-300/30 backdrop-blur-sm sm:px-6">
            <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link to={"/"} className="font-display text-xl font-bold text-slate-900">
                    CRM Hub
                </Link>

                <ul className="flex flex-wrap items-center gap-2">
                    {
                        user ? (
                            <>
                                <li><NavLink to={"/profile"} className={linkClasses}>Profile</NavLink></li>
                                <li><NavLink to={"/addclient"} className={linkClasses}>Add Client</NavLink></li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-400 hover:text-red-600"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to={"/register"} className={linkClasses}>Register</NavLink></li>
                                <li><NavLink to={"/login"} className={linkClasses}>Login</NavLink></li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Nav;