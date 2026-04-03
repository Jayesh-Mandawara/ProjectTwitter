import { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <p>Loading...</p>;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await handleLogin(username, password).then((res) => {
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
                        onInput={(e) => setUserName(e.target.value)}
                        type="text"
                        name="username"
                        placeholder="Enter your username or email here..."
                    />
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter your password here..."
                    />
                    <button type="submit">Login</button>
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
