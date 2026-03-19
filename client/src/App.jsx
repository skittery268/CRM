import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import AddClientPage from "./pages/AddClientPage";
import Client from "./components/Client";

const App = () => {
    return (
        <main>
            <Nav />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/addclient" element={<ProtectedRoute><AddClientPage /></ProtectedRoute>} />
                <Route path="/client/:clientId" element={<ProtectedRoute><Client /></ProtectedRoute>} />
            </Routes>
        </main>
    )
}

export default App;