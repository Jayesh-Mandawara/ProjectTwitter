import { getFeed, createPost, likePost, unlikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    const handleGetFeed = async () => {
        try {
            setLoading(true);
            const data = await getFeed();
            setFeed(data.posts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (image, caption) => {
        try {
            setLoading(true);
            const data = await createPost(image, caption);
            setFeed([data.post, ...feed]);
            // setPost(data.post);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (post) => {
        try {
            await likePost(post);
        } catch (error) {
            console.log(error);
            throw error; // Pass the error up so the optimistic UI can revert
        }
    };

    const handleUnLike = async (post) => {
        try {
            await unlikePost(post);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        handleGetFeed();
    }, []);

    return {
        loading,
        feed,
        post,
        handleGetFeed,
        handleCreatePost,
        handleLike,
        handleUnLike,
    };
};
