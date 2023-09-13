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

function Title({posts}){
    if(posts.search){
        return <h2 className="postsTitle">Search Results for: {posts.titleTerm}</h2>
    }else{
        return <h2 className="postsTitle">r/{posts.titleTerm}:</h2>
    }
}
