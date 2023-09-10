import React,{useEffect} from "react";
import Search from '../../features/search/Search';
import { useDispatch } from "react-redux";
import { fetchPosts} from '../../features/posts/postsSlice'
const subreddits = ['popular','funny','News','AskReddit','story']

export default function Banner(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPosts('popular'));
    },[]);
    function onClick(e,subreddit){
        dispatch(fetchPosts(subreddit));
    }
    return (
        <div className="banner">
            <h1>Reddit App</h1>
            <aside><Search/></aside>
            {subreddits.map((subreddit)=>{
                return <button onClick={(e)=>onClick(e,subreddit)}>r/{subreddit}</button>
            })}
        </div>
    )
};