import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';

export const getUser = createAsyncThunk(`user/getUser`, getUserApi);

export const loginUser = createAsyncThunk(
  `user/loginUser`,
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  `user/registerUser`,
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const updateUser = createAsyncThunk(
  `user/updateUser`,
  async (userData: TRegisterData) => {
    const data = await updateUserApi(userData);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(`user/logoutUser`, async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

type TUserAuthState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

export const initialState: TUserAuthState = {
  isAuthChecked: false,
  user: null,
  error: null
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUserData: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getAuthError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error get user data';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error login';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error register User';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error update data User';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error logout User';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const userAuthReducer = userAuthSlice.reducer;
export const { getUserData, getAuthChecked, getAuthError } =
  userAuthSlice.selectors;
export const { setAuthChecked, setUser } = userAuthSlice.actions;
