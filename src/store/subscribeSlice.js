// src/store/subscribeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscribedChannels: [],
};

const subscribeSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    toggleSubscribe: (state, action) => {
      const channelId = action.payload.id;
      const channelName = action.payload.name;
      const channelImage = action.payload.image;

      const index = state.subscribedChannels.findIndex(
        (channel) => channel.id === channelId
      );

      if (index === -1) {
        // Add to subscriptions
        state.subscribedChannels.push({
          id: channelId,
          name: channelName,
          image: channelImage,
        });
      } else {
        // Remove from subscriptions
        state.subscribedChannels = state.subscribedChannels.filter(
          (channel) => channel.id !== channelId
        );
      }
    },
  },
});

export const { toggleSubscribe } = subscribeSlice.actions;
export const selectSubscribedChannels = (state) =>
  state.subscriptions.subscribedChannels;

export default subscribeSlice.reducer;
