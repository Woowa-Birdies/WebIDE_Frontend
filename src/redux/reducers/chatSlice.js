import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isChatOpen: false,
  },
  reducers: {
    openChat: (state) => {
      state.isChatOpen = true;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
    },
  },
});

export const { openChat, closeChat } = chatSlice.actions;

export const selectIsChatOpen = (state) => state.chat.isChatOpen;

export default chatSlice.reducer;
