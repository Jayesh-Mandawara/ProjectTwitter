import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (usernameOrEmail, password) => {
        setLoading(true);

        try {
            const response = await login(usernameOrEmail, password);
            setUser(response.user);
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            setUser(response.user);
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        setLoading(true);
        try {
            const response = await getMe();
            setUser(response.user);
        } catch (err) {
            console.error("Fetch current user error:", err);
            setUser(null); // Clear user on error (e.g., not authenticated)
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                handleLogin,
                handleRegister,
                fetchCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
