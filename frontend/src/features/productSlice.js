import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery:""
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery:(state,action)=>{
          state.searchQuery = action.payload;
    }
  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
