import './AppLayout.css'
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
            <div className="banner">
                <h1>Reddit App</h1>
                {subreddits.map((subreddit)=>{
                return <button onClick={onClick} value={subreddit}>r/{subreddit}</button>
            })}
            </div>  
            {Object.values(posts).map((post)=>{
                return (<div key={post.id}>
                    <h2>r/{post.subreddit}: {post.title}</h2>
                    <img src={post.url} alt=""/>
                    <p>{post.selftext}</p>
                </div>) 
            })}
        </>
    )
};

export default AppLayout