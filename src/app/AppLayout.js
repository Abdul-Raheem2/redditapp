import React from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";

import { NavLink, Outlet } from "react-router-dom";

const subreddits = ['popular','funny','News','AskReddit']

export default function AppLayout(){
    const dispatch = useDispatch();
    function onClick(e,subreddit){
        dispatch(fetchPosts(subreddit));
    }
    return (
        <>
            <div className="banner">
                <h1>Reddit App</h1>
                {subreddits.map((subreddit)=>{
                    return <NavLink to={`/r/${subreddit}`} onClick={(e)=>onClick(e,subreddit)}>r/{subreddit}</NavLink>
                })}
            </div>
            <Outlet/>
        </>

    )
};