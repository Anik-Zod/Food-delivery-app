import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: {
    // productId: quantity
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const { productId } = action.payload;
      if (state.cartItems[productId]) {
        state.cartItems[productId] +=1;
      } else {
        state.cartItems[productId] = 1;
      }
      toast.success(`Added items to cart`);
    },
    
    removeCartItems: (state, action) => {
      const { productId } = action.payload;
      delete state.cartItems[productId];
      toast.success(`Removed item from cart`);
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state.cartItems[productId]) {
        state.cartItems[productId] = quantity;
        toast.success(`Updated item quantity to ${quantity}`);
      } else {
        toast.error(`Item not found in cart`);
      }
    },
    clearCart: (state) => {
      state.cartItems = {};
      toast.success(`Cart cleared`);
    },
  },
});

export const { addCartItems, removeCartItems, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
