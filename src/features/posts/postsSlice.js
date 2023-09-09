import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    console.table(response);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
})

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
        [fetchPosts.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.isError = false;
            let posts = {};
            action.payload.forEach((post) => {
                posts[post.id] = post;
            });
            state.posts = posts;
        },
        [fetchPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.isError=false;
        },
        [fetchPosts.rejected]: (state,action) => {
            state.isLoading=false;
            state.isError= true;  
        }
    }
});

export const selectPosts = (state) => state.posts;
export const {clearPosts} = postsSlice.actions;
export default postsSlice.reducer;