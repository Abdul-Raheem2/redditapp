import { useSelector } from "react-redux";

export default function SinglePost(){
    const posts = useSelector((state)=>state.posts);
    const post = posts.posts[posts.postClicked];
    return <p>{post.title}</p>
}