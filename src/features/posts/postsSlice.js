import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

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
        console.log(post);
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
    reducers: {},
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
            console.log(action.payload);
            state.postClicked={
                ...state.postClicked,
                comments:action.payload,
                loading:false,
                clicked:true
            }
        });
        builder.addCase(getComments.pending, (state,action) => {
            state.postClicked = {
                loading: true,
                clicked:true,
                ...state.posts[action.meta.arg.id]
            }
            state.postClicked.loading=true;
            state.postClicked.clicked=true;
        });
    }
});

export default postsSlice.reducer;