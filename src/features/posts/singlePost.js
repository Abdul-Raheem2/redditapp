import { useSelector} from "react-redux";

export default function SinglePost(){
    const post = useSelector((state)=>state.posts.postClicked);
    if(post.loading){
        return(
            <div>
                <h2 className="title">r/{post.subreddit}: {post.title}</h2>
                <p className="loadingText">Loading...</p>
            </div>
        )
    }else{
        return (
            <div>
                <h2 className="title">r/{post.subreddit}: {post.title}</h2>
                <button><a href={`https://www.reddit.com/r/${post.subreddit}/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
            </div>
        )
    }
}