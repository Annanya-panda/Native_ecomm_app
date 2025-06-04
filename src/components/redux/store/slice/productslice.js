import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetch', async (page = 0) => {
  const limit = 10;
  const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`);
  return response.data.products;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
      
        if (action.meta.arg === 0) {
          state.list = action.payload; 
        } else {
          state.list = [...state.list, ...action.payload];
        }
        state.page = action.meta.arg;
        state.hasMore = action.payload.length > 0; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
