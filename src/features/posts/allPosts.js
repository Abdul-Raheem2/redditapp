import React from "react";

import {useDispatch, useSelector } from "react-redux";
import { fetchPosts} from "./postsSlice";

import { toSinglePostPage } from "./postsSlice";

export default function AllPosts(){
    const posts = useSelector((state)=> state.posts);
    const dispatch = useDispatch();
    function handleClick(e,id){
        dispatch(toSinglePostPage(id));
    }
    return (
        Object.values(posts.posts).map((post)=>{
            return (
                <div key={post.id} className='post' onClick={(e)=>handleClick(e,post.id)}>
                    <h2>r/{post.subreddit}: {post.title}</h2>
                    <Content post={post}/>
                </div>) 
        })
    )
}

function Content({post}){
    if(!post.is_self){
        if(post.post_hint==="image"){
            return <img src={post.url} alt=""/>
        }
    }else{
        return post.selftext && <p>{post.selftext}</p>
    }
}
