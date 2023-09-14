import React from "react";
import { useDispatch } from "react-redux";
import { showHideCommentReplies } from "./postsSlice";

export default function Comments({comments}){
    const dispatch = useDispatch();
    function showReplies(e,comment){
        if(e.target.value==="true"){
            dispatch(showHideCommentReplies({comment:comment,visibility:true}));
            e.target.innerHTML = "Hide Replies";
            e.target.value = false;
        }else{
            dispatch(showHideCommentReplies({comment:comment,visibility:false}));
            e.target.innerHTML = "Show Replies";
            e.target.value = true;
        }
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
                <button onClick={(e)=>showReplies(e,comment)} value={true}>Show Replies</button>
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

