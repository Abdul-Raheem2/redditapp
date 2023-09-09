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

function addPosts(state,posts){
    let tempPosts = {};
    posts.forEach((post) => {
        tempPosts[post.id] = post;
    });
    state.posts = tempPosts;
}
const postsSlice = createSlice({
    name:'posts',
    initialState: {
        posts:{},
        isLoading: false,
        isError: false
    },
    reducers: {
    },
    extraReducers: {
        [fetchPosts.fulfilled || searchPosts.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.isError = false;
            addPosts(state,action.payload);
        },
        [fetchPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.isError=false;
        },
        [fetchPosts.rejected]: (state,action) => {
            state.isLoading=false;
            state.isError= true;  
        },
        [searchPosts.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.isError = false;
            addPosts(state,action.payload);
        },
        [searchPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.isError=false;
        },
        [searchPosts.rejected]: (state,action) => {
            state.isLoading=false;
            state.isError= true;  
        },
    }
});

export const selectPosts = (state) => state.posts;
export const {clearPosts} = postsSlice.actions;
export default postsSlice.reducer;