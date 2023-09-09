import React from "react";
import { useDispatch,useSelector } from "react-redux";

import { clearPosts } from "../features/posts/postsSlice";
import { fetchPosts } from "../features/posts/postsSlice";
import { selectPosts } from "../features/posts/postsSlice";

const subreddits = ['popular','funny','News','AskReddit']
function AppLayout(){
    const dispatch = useDispatch();
    function onClick(e){
        dispatch(clearPosts());
        dispatch(fetchPosts(e.target.value));
    }
    const posts = useSelector(selectPosts);
    return (
        <>
            
            {subreddits.map((subreddit)=>{
                return <button onClick={onClick} value={subreddit}>r/{subreddit}</button>
            })}
            {Object.values(posts).map((post)=>{
                return <p key={post.id}>{post.title}</p>
            })}
        </>
    )
};

export default AppLayout