import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducers/loginSlice";
import chatSlice from "./reducers/chatSlice";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
    chat: chatSlice,
  },
});
