import { useRef, useState } from "react";
import "../style/createPost.scss";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const imageFieldRef = useRef(null);
    const navigate = useNavigate();

    const { loading, handleCreatePost } = usePost();

    async function handleSubmit(e) {
        e.preventDefault();

        const file = imageFieldRef.current.files[0];
        await handleCreatePost(file, caption);

        navigate("/");
    }

    if (loading) {
        return (
            <div className="loading">
                <p>Creating Post...</p>
            </div>
        );
    }

    return (
        <main className="create-post-page">
            <div className="form-container">
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <label className="post-image-label" htmlFor="postImage">
                        Select Image
                    </label>
                    <input
                        ref={imageFieldRef}
                        hidden
                        type="file"
                        name="postImage"
                        id="postImage"
                    />
                    <input
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        type="text"
                        name="caption"
                        id="caption"
                        placeholder="Enter caption here..."
                    />
                    <button className="button primary-button">
                        Create Post
                    </button>
                </form>
            </div>
        </main>
    );
};

export default CreatePost;
