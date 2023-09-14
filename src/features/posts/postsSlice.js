import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
})

export const searchPosts = createAsyncThunk('posts/searchPosts', async (searchTerm) => {
    const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
})

export const getComments = createAsyncThunk('posts/getComments', async ({id,permalink}) => {
    const response = await fetch(`https://www.reddit.com/${permalink}.json`);
    const json = await response.json();
    return json[1].data.children.map((subreddit) => subreddit.data);
})

function addPosts(state,posts){
    let tempPosts = {};
    posts.forEach((post) => {
        tempPosts[post.id] = {
            id:post.id,
            title:post.title,
            subreddit:post.subreddit,
            permalink: post.permalink,
            author: post.author,
            video_url: post.is_video ? post.secure_media.reddit_video.fallback_url : '',
            type: post.is_video ? "video" : post.post_hint,
            text:post.selftext,
            image_url: post.url
            
        };
    });
    state.posts = tempPosts;
}
function addComments(state,comments){
    console.log(comments.pop()); /*dont delete pop*/
    state.postClicked.comments = comments.map((comment)=>{
        let n =  {
            id:comment.id,
            parentIds: [],
            author:comment.author,
            body:comment.body,
            depth:comment.depth,
            visible:true,
        }
        n.replies = addReplies(comment,n);
        return n;
    })
}

function addReplies(comment,n){
    if(!comment.replies) {return []}
    return comment.replies.data.children.filter((r)=>r.kind==="t1").map((reply)=>{
        let m =  {
            id:reply.data.id,
            parentIds: [...n.parentIds,comment.id],
            author: reply.data.author,
            body:reply.data.body,
            depth: reply.data.depth,
            visible:false
        }
        m.replies = addReplies(reply.data,m);
        return m;
    })
}
const postsSlice = createSlice({
    name:'posts',
    initialState: {
        posts:{},
        postClicked:{clicked:false},
        search:false, //if posts should show search results or subreddit title
        titleTerm:'',
        isLoading: false,
        isError: false
    },
    reducers: {
        showCommentReplies: (state,action)=> {
            let found = state.postClicked.comments;
            if(action.payload.parentIds.length){
                action.payload.parentIds.forEach((id)=>{
                    found = found.find((comment)=>comment.id===id).replies
                })
            }
            found.find((comment)=>comment.id===action.payload.id).replies.forEach((reply)=>{
                reply.visible=true;
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            addPosts(state,action.payload);
        });
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.titleTerm=action.meta.arg;
            state.search=false;
            state.isLoading = true;
            state.isError=false;
            state.postClicked.clicked = false;
        });
        builder.addCase(fetchPosts.rejected, (state,action) => {
            state.isLoading=false;
            state.isError= true;  
        });
        builder.addCase(searchPosts.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            addPosts(state,action.payload);
        });
        builder.addCase(searchPosts.pending, (state, action) => {
            state.search=true;
            state.titleTerm=action.meta.arg;
            state.isLoading = true;
            state.isError=false;
            state.postClicked.clicked = false;
        });
        builder.addCase(searchPosts.rejected, (state,action) => {
            state.isLoading=false;
            state.isError= true;  
        });
        builder.addCase(getComments.fulfilled, (state,action) => {
            state.postClicked={
                ...state.postClicked,
                loading:false,
                clicked:true,
                commentError:false
            }
            addComments(state,action.payload);
        });
        builder.addCase(getComments.pending, (state,action) => {
            state.postClicked = {
                loading: true,
                clicked:true,
                commentError: false,
                ...state.posts[action.meta.arg.id]
            }
        });
        builder.addCase(getComments.rejected, (state,action) => {
            state.postClicked.loading=false;
            state.postClicked.commentError = true;
        });
    }
});

export default postsSlice.reducer;

export const {showCommentReplies} = postsSlice.actions;