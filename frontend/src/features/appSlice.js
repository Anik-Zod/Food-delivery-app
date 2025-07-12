import { createSlice } from "@reduxjs/toolkit";
import { assets } from "../assets/assets";

const initialState = {
  user: {
    name: "Anik",
    image: "https://res.cloudinary.com/dj6y31jyx/image/upload/v1752071229/IMG_0041_oo6ezt.jpg",
  },

  isSeller: false,
  
  showUserLogin: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowUserLogin: (state, action) => {
      state.showUserLogin = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isSeller = false;
      state.showUserLogin = false;
    },
    // Add more app-related reducers as needed
  },
});

export const { setShowUserLogin, logout } = appSlice.actions;
export default appSlice.reducer;
