import React from "react";
import { useDispatch,useSelector } from "react-redux";

import { fetchPosts } from "../features/posts/postsSlice";
import { selectPosts } from "../features/posts/postsSlice";

function AppLayout(){
    const dispatch = useDispatch();
    function onClick(){
        dispatch(fetchPosts("popular"));
    }
    const posts = useSelector(selectPosts);
    return (
        <>
            <button onClick={onClick}>Search r/popular</button>
            {Object.values(posts).map((post)=>{
                return <p>{post.text}</p>
            })}
        </>
    )
};

export default AppLayout