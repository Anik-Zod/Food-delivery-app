import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from "../assets/assets";

const initialState = {
  products: dummyProducts,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // Add more product-related reducers as needed
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
