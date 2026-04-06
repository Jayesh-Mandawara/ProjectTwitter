import "../style/feed.scss";
import { usePost } from "../hook/usePost";
import { useEffect } from "react";
import Posts from "../components/Posts";

const Feed = () => {
    const { feed, handleGetFeed, loading } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    if (loading || !feed) {
        return (
            <div className="loading">
                <p>Feed is loading...</p>
            </div>
        );
    }

    return (
        <main className="feed-page">
            <div className="feed">
                {feed.map((post) => {
                    return (
                        <Posts key={post._id} user={post.user} post={post} />
                    );
                })}
            </div>
        </main>
    );
};

export default Feed;
