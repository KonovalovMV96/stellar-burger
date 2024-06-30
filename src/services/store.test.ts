import store, { rootReducer } from './store';

describe('Тест rootReducer', () => {
  it('проверка работы rootReducer', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const initialState = store.getState();
    const state = rootReducer(undefined, fakeAction);
    expect(state).toEqual(initialState);
  });
});
