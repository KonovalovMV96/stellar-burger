import { initialState, orderBurger, orderReducer } from './orderPostSlice';

describe('тестирование orderPostSlice', () => {
  const actions = {
    pending: {
      type: orderBurger.pending.type,
      payload: null
    },
    rejected: {
      type: orderBurger.rejected.type,
      error: { message: 'Test error' }
    },
    fulfilled: {
      type: orderBurger.fulfilled.type,
      payload: {
        order: {
          number: 1,
          ingredients: ['data1', 'data2']
        }
      }
    }
  };

  it('тест orderBurger.pending', () => {
    const state = orderReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест orderBurger.rejected', () => {
    const state = orderReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест orderBurger.fulfilled', () => {
    const state = orderReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.order).toEqual(actions.fulfilled.payload.order);
  });
});
