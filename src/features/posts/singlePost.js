import { useSelector} from "react-redux";
import PostContent from "./PostContent";
import Comments from "./Comments";
export default function SinglePost(){
    const post = useSelector((state)=>state.posts.postClicked);
    if(post.loading){
        return(
            <div>
                <PostContent key= {post.id} post={post}/>
                <button><a href={`https://www.reddit.com/r/${post.subreddit}/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
                <p className="loadingText">Loading Comments...</p>
            </div>
        )
    }else if(post.commentError){
        return (<div>
            <PostContent key= {post.id} post={post}/>
            <button><a href={`https://www.reddit.com/r/${post.subreddit}/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
            <p className="loadingText">Comments failed to load</p>
        </div>)
    }
    else{
        return (
            <div>
                <PostContent key={post.id} post={post}/>
                <button><a href={`https://www.reddit.com/r/${post.subreddit}/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
                <p>Comments:</p>
                <Comments comments={post.comments}/>
            </div>
        )
    }
}