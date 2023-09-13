import React from "react";

import PostContent from "./PostContent";
import {useDispatch, useSelector } from "react-redux";

import {getComments } from "./postsSlice";

export default function AllPosts(){
    const dispatch = useDispatch();
    const posts = useSelector((state)=> state.posts);
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
            <div className='posts'>
                <Title posts={posts}/>
                {Object.values(posts.posts).map((post)=>{
                    return <PostContent post={post} className='post' onClick={(e)=>dispatch(getComments({id:post.id,permalink:post.permalink}))}/>
                })}
            </div>
        )
    }

}

function Title({posts}){
    if(posts.search){
        return <h2 className="title">Search Results for: {posts.titleTerm}</h2>
    }else{
        return <h2 className="title">r/{posts.titleTerm}:</h2>
    }
}
