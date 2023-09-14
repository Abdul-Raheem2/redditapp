import React from "react";
import { useDispatch } from "react-redux";
import { showCommentReplies } from "./postsSlice";

export default function Comments({comments}){
    const dispatch = useDispatch();
    function showReplies(e,comment){
        dispatch(showCommentReplies(comment));
    }
    function style(comment){
        return {
            marginLeft: comment.depth*10,
            border: comment.depth ? "thin solid red" : "thick solid black",
            display: comment.visible ? "block" : "none"
        }
    }
    return comments.map((comment)=>{
        if(comment.replies.length){
            return (<div key={comment.id} style={style(comment)}>
                <p>{comment.author}: {comment.body}</p>
                <button onClick={(e)=>showReplies(e,comment)}>Show Replies</button>
                <Comments comments={comment.replies}/>
            </div>)
        }else{
            return (
                <div key={comment.id} style={style(comment)}>
                    <p>{comment.author}: {comment.body}</p>
                </div>
            )
        }
    })
}

