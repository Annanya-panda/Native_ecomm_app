import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice';
import productReducer from './slice/productslice';
import cartReducer from './slice/cartSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
