import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    sendMessageProgress: false,
    deleteMessageProgress: false,
    error: false,
  },
  reducers: {
    sendMessageSuccess: (state, action) => {
      state.messages.push(action.payload);
      state.sendMessageProgress = false;
    },
    sendMessageFailure: (state) => {
      state.error = true;
      state.sendMessageProgress = false;
    },
    deleteMessageSuccess: (state, action) => {
      state.messages = state.messages.filter((message) => message._id !== action.payload);
      state.deleteMessageProgress = false;
    },
    deleteMessageFailure: (state) => {
      state.error = true;
      state.deleteMessageProgress = false;
    },
  },
});

export const {
  sendMessageSuccess,
  sendMessageFailure,
  deleteMessageSuccess,
  deleteMessageFailure,
} = messageSlice.actions;

export default messageSlice.reducer;
