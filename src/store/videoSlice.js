import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedVideos: [],
  savedVideos: [],
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    toggleLikeVideo: (state, action) => {
      const videoId = action.payload;
      const index = state.likedVideos.indexOf(videoId);
      if (index === -1) {
        state.likedVideos.push(videoId);
      } else {
        state.likedVideos.splice(index, 1);
      }
    },
    toggleSaveVideo: (state, action) => {
      const videoId = action.payload;
      const index = state.savedVideos.indexOf(videoId);
      if (index === -1) {
        state.savedVideos.push(videoId);
      } else {
        state.savedVideos.splice(index, 1);
      }
    },
  },
});

export const { toggleLikeVideo, toggleSaveVideo } = videoSlice.actions;
export default videoSlice.reducer;

export const selectLikedVideos = (state) => state.videos.likedVideos;
export const selectSavedVideos = (state) => state.videos.savedVideos;
