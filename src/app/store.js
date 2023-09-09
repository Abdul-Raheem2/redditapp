import { configureStore } from "@reduxjs/toolkit";
// import reducers
import postsReducer from '../features/posts/postsSlice';
export default configureStore({
  reducer: {
    posts:postsReducer
  },
});