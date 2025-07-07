import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../features/appSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;