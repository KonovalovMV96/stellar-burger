import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

type TOrdersGetState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TOrdersGetState = {
  orders: [],
  loading: false,
  error: null
};

export const getOrdersUser = createAsyncThunk(`orders/getOrders`, getOrdersApi);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getOrdersLoading: (state) => state.loading,
    getOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const { getOrders, getOrdersLoading, getOrdersError } =
  ordersSlice.selectors;
