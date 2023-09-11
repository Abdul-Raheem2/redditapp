import React,{useEffect} from "react";
import Search from '../../features/search/Search';
import { useDispatch } from "react-redux";
import { fetchPosts} from '../../features/posts/postsSlice'
const subreddits = ['popular','funny','News','AskReddit','story','pakistan']

export default function Banner(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPosts('news'));
    },[]);
    function onClick(e,subreddit){
        dispatch(fetchPosts(subreddit));
    }
    return (
        <div className="banner">
            <h1>Reddit App</h1>
            <aside><Search/></aside>
            {subreddits.map((subreddit,i)=>{
                return <button key={i} onClick={(e)=>onClick(e,subreddit)}>r/{subreddit}</button>
            })}
        </div>
    )
};