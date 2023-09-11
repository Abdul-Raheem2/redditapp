import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getPostDetatils } from "./postsSlice";

export default function SinglePost(){
    const posts = useSelector((state)=>state.posts);
    const post = posts.posts[posts.postClicked];
    const dispatch = useDispatch();
    return (
        <div>
            <p>{post.title}</p>
            <button><a href={`https://www.reddit.com/r/${post.subreddit}/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
        </div>
    )
}