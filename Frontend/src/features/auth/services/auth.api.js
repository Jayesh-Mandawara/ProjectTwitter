import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

async function register(username, email, password) {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password,
        });
        return response.data;
    } catch (err) {
        console.error("Registration failed:", err);
        throw err;
    }
}

async function login(usernameOrEmail, password) {
    try {
        const isEmail = usernameOrEmail.includes("@");
        const response = await api.post("/login", {
            username: isEmail ? undefined : usernameOrEmail,
            email: isEmail ? usernameOrEmail : undefined,
            password,
        });
        return response.data;
    } catch (err) {
        console.error("Login failed:", err); // Or "throw err" to handle it in the component
        throw err;
    }
}

async function getMe() {
    try {
        const response = await api.get("/get-me");
        return response.data;
    } catch (err) {
        console.error("Get me failed:", err);
        throw err;
    }
}

export { register, login, getMe };
