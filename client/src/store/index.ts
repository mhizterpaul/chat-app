import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import chatsReducer from "./slices/chats";
import { chatApi } from "./slices/api/actions";

export const store = configureStore({
  reducer: {
    account: userReducer,
    chats: chatsReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
