import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  `order/orderBurger`,
  async (dataOrder: string[]) => orderBurgerApi(dataOrder)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderLoading: (state) => state.loading,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { getOrder, getOrderLoading, getOrderError } =
  orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
