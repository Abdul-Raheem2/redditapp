import React from "react";
import { useParams } from "react-router-dom";

import {useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "./postsSlice";


export default function Posts(){
    //const {subreddit} = useParams();
    const posts = useSelector(selectPosts);
    if (posts.isLoading){
        return <p>Loading...</p>
    }else if(posts.isError){
        return <p>Failed to fetch posts</p>
    }else{
        return (
            Object.values(posts.posts).map((post)=>{
                return (
                    <div key={post.id} className='post'>
                        <h2>r/{post.subreddit}: {post.title}</h2>
                        <img src={post.url} alt=""/>
                        <p>{post.selftext}</p>
                    </div>) 
            })
        )
    }
}
