import { createContext, useEffect, useState } from "react";
import { fetchGetMe, fetchLogin, fetchLogout, fetchRegister } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await fetchGetMe();

                setUser(res.data.data.user);
                navigate("/profile");
            } catch (err) {
                toast.error(err.response.message);
            }
        }

        getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const register = async (formData) => {
        try {
            const res = await fetchRegister(formData);

            toast.success(res.data.message);
            navigate("/login");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const login = async (formData) => {
        try {
            const res = await fetchLogin(formData);

            setUser(res.data.data.user);
            toast.success(res.data.message);
            navigate("/profile");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const logout = async () => {
        try {
            const res = await fetchLogout();

            toast.success(res.data.message);
            setUser(null);
            navigate("/login");
        } catch (err) {
            toast.error(err.response.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, logout, register, login }}>
            {children}
        </AuthContext.Provider>
    )
}