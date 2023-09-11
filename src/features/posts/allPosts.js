import React from "react";

import {useDispatch, useSelector } from "react-redux";

import { toSinglePostPage,getPostDetatils } from "./postsSlice";

export default function AllPosts(){
    const posts = useSelector((state)=> state.posts);
    const dispatch = useDispatch();
    function handleClick(e,id){
        dispatch(toSinglePostPage(id));
        dispatch(getPostDetatils({subreddit:posts.posts[id].subreddit,id:id}));
    }
    return (
        Object.values(posts.posts).map((post)=>{
            return (
                <div key={post.id} className='posts' onClick={(e)=>handleClick(e,post.id)}>
                    <h2 className="postsTitle">r/{post.subreddit}: {post.title}</h2>
                    <h3>post by: {post.author}</h3>
                    <Content post={post}/>
                </div>) 
        })
    )
}

function Content({post}){
    if(post.is_video){
        return <video height="500" width="500" controls>
            <source src={post.secure_media.reddit_video.fallback_url} type="video/mp4"/>
            Video not supported
        </video>
    }
    else if(post.post_hint==="image"){
        if(post.selftext){
            return (
                <div className="postsContent">
                    <img src={post.url} alt=""/>
                    <p>{post.selftext}</p>
                </div>
            )
        }else{
            return <img src={post.url} alt=""/>
        }

    }else{
        return <p>{post.selftext}</p>
    }
}
