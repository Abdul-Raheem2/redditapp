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
                <div key={post.id} className='posts' onClick={(e)=>handleClick(e,post.id)}>
                    <h2 className="postsTitle">r/{post.subreddit}: {post.title}</h2>
                    <Content post={post}/>
                </div>) 
        })
    )
}

function Content({post}){
    if(post.post_hint ==="hosted:video"){
        return <p>Video</p>
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
