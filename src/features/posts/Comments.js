import React from "react";
import { useDispatch } from "react-redux";
import { showHideCommentReplies } from "./postsSlice";

export default function Comments({comments}){
    const dispatch = useDispatch();
    function showHideReplies(e,comment){
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
    return comments.map((comment)=>{
        if(comment.replies.length){
            return (<div key={comment.id} style={style(comment)}>
                <p>{comment.author}: {comment.body}</p>
                <button onClick={(e)=>showHideReplies(e,comment)} value={true}>Show Replies</button>
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


function style(comment){
    return {
        marginLeft: comment.depth*10,
        border: comment.depth ? "thin solid black" : "thick solid black",
        display: comment.visible ? "block" : "none"
    }
}
