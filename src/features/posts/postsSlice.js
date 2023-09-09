import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
})

const postsSlice = createSlice({
    name:'posts',
    initialState: {},
    reducers: {
        clearPosts: (state,action) => {
            return {};
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state,action) => {
            action.payload.forEach((post) => {
                state[post.id] = post;
            });
        }
    }
});

export const selectPosts = (state) => state.posts;
export const {clearPosts} = postsSlice.actions;
export default postsSlice.reducer;