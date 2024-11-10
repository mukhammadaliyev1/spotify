import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("likedTracks")) || [];

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const trackId = action.payload;
      const isLiked = state.includes(trackId);
      if (isLiked) {
        return state.filter((id) => id !== trackId);
      } else {
        state.push(trackId);
      }
      // Save the updated list to localStorage
      localStorage.setItem("likedTracks", JSON.stringify(state));
    },
  },
});

export const { toggleLike } = likeSlice.actions;

export default likeSlice.reducer;
