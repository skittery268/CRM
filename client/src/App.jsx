import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import AddClientPage from "./pages/AddClientPage";
import Client from "./components/Client";
import Home from "./pages/Home";

const App = () => {
    return (
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-10">
            <Nav />

            <section className="mt-6 flex-1 rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-lg shadow-slate-300/30 backdrop-blur-sm sm:p-6 lg:p-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/addclient" element={<ProtectedRoute><AddClientPage /></ProtectedRoute>} />
                    <Route path="/client/:clientId" element={<ProtectedRoute><Client /></ProtectedRoute>} />
                </Routes>
            </section>
        </main>
    )
}

export default App;