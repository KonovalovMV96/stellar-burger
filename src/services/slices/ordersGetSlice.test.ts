import { getOrdersUser, ordersReducer, initialState } from './ordersGetSlice';

describe('тестирование ordersGetSlice', () => {
  const actions = {
    pending: {
      type: getOrdersUser.pending.type,
      payload: null
    },
    rejected: {
      type: getOrdersUser.rejected.type,
      error: { message: 'Test error' }
    },
    fulfilled: {
      type: getOrdersUser.fulfilled.type,
      payload: { orders: ['data1', 'data2'] }
    }
  };

  it('тест getOrdersUser.pending', () => {
    const state = ordersReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест getOrdersUser.rejected', () => {
    const state = ordersReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест getOrdersUser.fulfilled', () => {
    const state = ordersReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(actions.fulfilled.payload);
  });
});
