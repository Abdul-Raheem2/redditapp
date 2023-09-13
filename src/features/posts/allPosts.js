import React from "react";

import {useDispatch, useSelector } from "react-redux";

import { toSinglePostPage,getPostDetatils, getComments } from "./postsSlice";

export default function AllPosts(){
    const posts = useSelector((state)=> state.posts);
    const dispatch = useDispatch();
    function handleClick(e,id){
        dispatch(getComments({id:id,permalink:posts.posts[id].permalink}));
    }
    if(posts.isLoading){
        return(
            <div>
                <Title posts={posts}/>
                <p className="loadingText">Loading...</p>
            </div>
        )
    }else if(posts.isError){
        return <p className="errorText">Subreddit/Search failed to load</p>
    }else{
        return (
            <div>
                <Title posts={posts}/>
                {Object.values(posts.posts).map((post)=>{
                    return (
                    <div key={post.id} className='posts' onClick={(e)=>handleClick(e,post.id)}>
                        <h3 className="postsTitle">r/{post.subreddit}: {post.title}</h3>
                        <h4>post by: {post.author}</h4>
                        <Content post={post}/>
                    </div>) 
                    })}
            </div>
        )
    }

}

function Content({post}){
    if(post.type==="video"){
        return <video height="500" width="500" controls>
            <source src={post.video_url} type="video/mp4"/>
            Video not supported
        </video>
    }
    else if(post.type==="image"){
        if(post.text){
            return (
                <div className="postsContent">
                    <img src={post.image_url} alt=""/>
                    <p>{post.text}</p>
                </div>
            )
        }else{
            return <img src={post.image_url} alt=""/>
        }

    }else{
        return <p>{post.text}</p>
    }
}

function Title({posts}){
    if(posts.search){
        return <h2 className="title">Search Results for: {posts.titleTerm}</h2>
    }else{
        return <h2 className="title">r/{posts.titleTerm}:</h2>
    }
}
