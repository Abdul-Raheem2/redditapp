import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit) => {
    const response = await fetch('https://www.reddit.com/r/popular.json');
    console.table(response.headers);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
})

const postsSlice = createSlice({
    name:'posts',
    initialState: {},
    reducers: {},
    extraReducers: {
        [fetchPosts.fulfilled]: (state,action) => {
            action.payload.forEach((post) => {
                state[post.id] = {
                    text: post.selftext
                };
            });
        }
    }
});

export const selectPosts = (state) => state.posts;
export default postsSlice.reducer;