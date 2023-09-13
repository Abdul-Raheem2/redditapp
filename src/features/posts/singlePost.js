import { useSelector} from "react-redux";
import PostContent from "./PostContent";
export default function SinglePost(){
    const post = useSelector((state)=>state.posts.postClicked);
    if(post.loading){
        return(
            <div>
                <PostContent post={post}/>
                <button><a href={`https://www.reddit.com/r/${post.subreddit}/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
                <p className="loadingText">Loading Comments...</p>
            </div>
        )
    }else{
        return (
            <div>
                <PostContent post={post}/>
                <button><a href={`https://www.reddit.com/r/${post.subreddit}/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
                <p>Comments:</p>
                {post.comments.map((comment)=>{
                    return <p>{comment.body}</p>
                })}
            </div>
        )
    }
}