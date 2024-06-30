import store, { rootReducer } from './store';

describe('тестирование rootReducer', () => {
  it('тест работы rootReducer', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const initialState = store.getState();
    const state = rootReducer(undefined, fakeAction);
    expect(state).toEqual(initialState);
  });
});
