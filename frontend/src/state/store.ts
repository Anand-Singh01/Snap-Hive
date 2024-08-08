import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./slices/commentSlice";
import postSlice from "./slices/postSlice";
import replySlice from "./slices/replySlice";
import userSlice from "./slices/userSlice";
import utilitySlice from "./slices/utilitySlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
    utilitySlice: utilitySlice,
    replySlice: replySlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
