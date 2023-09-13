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

export const getPostDetatils = createAsyncThunk('posts/getPostDetails', async ({subreddit,id}) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}.json`);
    const json = await response.json();
    console.log(response);
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
        postClicked:'',
        search:false, //if posts should show search results or subreddit title
        titleTerm:'',
        isLoading: false,
        isError: false
    },
    reducers: {
        toSinglePostPage: (state,action)=>{
            state.postClicked=action.payload;
        },
        toAllPostsPage: (state,action)=>{
            state.postClicked = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.postClicked='';
            addPosts(state,action.payload);
        });
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.titleTerm=action.meta.arg;
            state.search=false;
            state.isLoading = true;
            state.isError=false;
        });
        builder.addCase(fetchPosts.rejected, (state,action) => {
            state.isLoading=false;
            state.isError= true;  
        });
        builder.addCase(searchPosts.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.postClicked='';
            addPosts(state,action.payload);
        });
        builder.addCase(searchPosts.pending, (state, action) => {
            state.search=true;
            state.titleTerm=action.meta.arg;
            state.isLoading = true;
            state.isError=false;
        });
        builder.addCase(searchPosts.rejected, (state,action) => {
            state.isLoading=false;
            state.isError= true;  
        });
    }
});

export const {toSinglePostPage} = postsSlice.actions
export const {toAllPostsPage} = postsSlice.actions;
export default postsSlice.reducer;