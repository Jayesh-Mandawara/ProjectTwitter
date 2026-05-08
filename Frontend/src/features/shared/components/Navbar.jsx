import "../nav.scss";
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <h2>Twitter</h2>
            <button
                onClick={() => {
                    navigate("/create-post");
                }}
                className="button primary-button">
                New Post
            </button>
        </nav>
    );
};

export default Navbar;
