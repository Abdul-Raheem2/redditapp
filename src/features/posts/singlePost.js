import { useSelector } from "react-redux";

export default function SinglePost(){
    const posts = useSelector((state)=>state.posts);
    const post = posts.posts[posts.postClicked];
    return (
        <div>
            <p>{post.title}</p>
            <button><a href={`https://www.reddit.com/r/mildlyinfuriating/comments/${post.id}`} target='_blank'>View on Reddit</a></button>
        </div>
    )
}