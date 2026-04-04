import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleRegister, loading } = useAuth();
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
            await handleRegister(username, email, password).then((res) => {
                console.log("Registration successful:", res);
            });
            navigate("/");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => setUsername(e.target.value)}
                        type="text"
                        name="username"
                        placeholder="Enter your username here..."
                    />
                    <input
                        onInput={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        placeholder="Enter your email here..."
                    />
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter your password here..."
                    />
                    <button className="button primary-button" type="submit">
                        Register
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link className="link" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
