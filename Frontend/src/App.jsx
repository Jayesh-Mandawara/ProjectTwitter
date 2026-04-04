import "./features/shared/global.scss"; 
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context.jsx";

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
