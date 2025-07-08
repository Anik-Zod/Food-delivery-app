import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: [
    // {
    //   productId:"123",
    //   name:'t-shirt',
    //   price:200,
    //   quantity:0,
    //   image:'http//....'
    // }
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const { productId, name, price, image } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(`Increased quantity of ${name}`);
      } else {
        state.cart.push({ productId, name, price, quantity: 1, image });
        toast.success(`Added ${name} to cart`);
      }
    },

    removeCartItems: (state, action) => {
      const { productId } = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productId === productId
      );
      if (index !== -1) {
        const removed = state.cart.splice(index, 1)[0];
        toast.success(`Removed ${removed.name} from cart`);
      }
    },

    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        toast.success(`Updated ${item.name} quantity to ${quantity}`);
      } else {
        toast.error(`Item not found in cart`);
      }
    },

    clearCart: (state) => {
      state.cart = [];
      toast.success(`Cart cleared`);
    },
  },
});

export const {
  addCartItems,
  removeCartItems,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
