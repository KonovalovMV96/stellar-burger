import {
  getIngredients,
  ingredientsReducer,
  initialState
} from './ingredientSlice';

describe('тестирование ingredientSlice', () => {
  const actions = {
    pending: {
      type: getIngredients.pending.type,
      payload: null
    },
    rejected: {
      type: getIngredients.rejected.type,
      error: { message: 'Test error' }
    },
    fulfilled: {
      type: getIngredients.fulfilled.type,
      payload: ['data1', 'data2']
    }
  };

  it('тест getIngredients.pending', () => {
    const state = ingredientsReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест getIngredients.rejected', () => {
    const state = ingredientsReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест getIngredients.fulfilled', () => {
    const state = ingredientsReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(actions.fulfilled.payload);
  });
});
