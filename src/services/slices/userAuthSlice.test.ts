import {
  getUser,
  userAuthReducer,
  initialState,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
} from './userAuthSlice';

describe('тестирование userAuthSlice', () => {
  describe('тест getUser', () => {
    const actions = {
      pending: {
        type: getUser.pending.type,
        payload: null
      },
      rejected: {
        type: getUser.rejected.type,
        error: { message: 'Test error' }
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'testName', email: 'testEmail' } }
      }
    };

    it('тест getUser.pending', () => {
      const state = userAuthReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест getUser.rejected', () => {
      const state = userAuthReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест getUser.fulfilled', () => {
      const nextState = userAuthReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload.user);
    });
  });

  describe('тестирование loginUser', () => {
    const actions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'Test error' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'testName', email: 'testEmail' } }
      }
    };

    it('тест loginUser.pending', () => {
      const state = userAuthReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест loginUser.rejected', () => {
      const state = userAuthReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест loginUser.fulfilled', () => {
      const nextState = userAuthReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });

  describe('тестирование registerUser', () => {
    const actions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'Test error' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'testName', email: 'testEmail' } }
      }
    };

    it('тест registerUser.pending', () => {
      const state = userAuthReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест registerUser.rejected', () => {
      const state = userAuthReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест registerUser.fulfilled', () => {
      const nextState = userAuthReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });

  describe('тестирование updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'Test error' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'testName', email: 'testEmail' } }
      }
    };

    it('тест updateUser.pending', () => {
      const state = userAuthReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест updateUser.rejected', () => {
      const state = userAuthReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест updateUser.fulfilled', () => {
      const nextState = userAuthReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });

  describe('тестирование logoutUser', () => {
    const actions = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'Test error' }
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: null
      }
    };

    it('тест logoutUser.pending', () => {
      const state = userAuthReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест logoutUser.rejected', () => {
      const state = userAuthReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест logoutUser.fulfilled', () => {
      const nextState = userAuthReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });
});
