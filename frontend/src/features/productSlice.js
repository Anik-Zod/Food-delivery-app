import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from "../assets/assets";

const initialState = {
  products: dummyProducts,
  searchQuery:""
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchQuery:(state,action)=>{
          state.searchQuery = action.payload;
    }
    // Add more product-related reducers as needed
  },
});

export const { setProducts,setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
