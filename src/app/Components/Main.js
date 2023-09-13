import React from "react";

import { useSelector } from "react-redux";
import AllPosts from "../../features/posts/allPosts";
import SinglePost from "../../features/posts/singlePost";

export default function Main(){
    const posts = useSelector((state)=>state.posts);
    if(posts.postClicked.clicked){
        return <SinglePost/>
    }else{
        return <AllPosts/>
    }
}