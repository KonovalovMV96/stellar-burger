import { feedReducer, getFeeds, initialState } from './feedSlice';

describe('тестирование feedSlice', () => {
  const actions = {
    pending: {
      type: getFeeds.pending.type,
      payload: null
    },
    rejected: {
      type: getFeeds.rejected.type,
      error: { message: 'Test error' }
    },
    fulfilled: {
      type: getFeeds.fulfilled.type,
      payload: { orders: ['data1', 'data2'], total: 2, totalToday: 1 }
    }
  };

  it('тест getFeeds.pending', () => {
    const state = feedReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест getFeeds.rejected', () => {
    const state = feedReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест getFeeds.fulfilled', () => {
    const state = feedReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(actions.fulfilled.payload.orders);
    expect(state.total).toEqual(actions.fulfilled.payload.total);
    expect(state.totalToday).toEqual(actions.fulfilled.payload.totalToday);
  });
});
