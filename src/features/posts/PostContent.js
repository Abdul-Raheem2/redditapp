
export default function PostContent({post,className,onClick}){
    if(post.type==="video"){
        return (
            <div className={className} onClick={onClick}>
                <h3 className="postsTitle">r/{post.subreddit}: {post.title}</h3>
                <h4>post by: {post.author}</h4>
                <video height="500" width="500" controls>
                    <source src={post.video_url} type="video/mp4"/>
                    Video not supported
                </video>
            </div>
        )
    }
    else if(post.type==="image"){
        if(post.text){
            return (
                <div className={className} onClick={onClick}>
                    <h3 className="postsTitle">r/{post.subreddit}: {post.title}</h3>
                    <h4>post by: {post.author}</h4>
                    <div className="postsContent">
                        <img src={post.image_url} alt=""/>
                        <p>{post.text}</p>
                    </div>
                </div>
            )
        }else{
            return (
                <div className={className} onClick={onClick}>
                    <h3 className="postsTitle">r/{post.subreddit}: {post.title}</h3>
                    <h4>post by: {post.author}</h4>
                    <img src={post.image_url} alt=""/>
                </div>
            )
        }

    }else{
        return (
            <div className={className} onClick={onClick}>
                <h3 className="postsTitle">r/{post.subreddit}: {post.title}</h3>
                <h4>post by: {post.author}</h4>
                <p>{post.text}</p>
            </div>
        )
    }
}