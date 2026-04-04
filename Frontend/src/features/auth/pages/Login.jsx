import { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="loading">
                <p>Loading...</p>
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await handleLogin(usernameOrEmail, password).then((res) => {
                console.log("Login successful:", res);
            });
            navigate("/");
        } catch (err) {
            console.error("Login failed:", err);
        }
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => setUsernameOrEmail(e.target.value)}
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Enter your username or email here..."
                    />
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter your password here..."
                    />
                    <button className="button primary-button" type="submit">
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link className="link" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
