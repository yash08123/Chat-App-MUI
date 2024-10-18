import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentUser: 'User1',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        id: state.messages.length + 1,
        text: action.payload,
        user: state.currentUser,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        id: state.messages.length + 1,
        text: action.payload.text,
        user: action.payload.user,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
