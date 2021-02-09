import { PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from 'app/services/AuthService';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, LoginPayload } from './types';
import { JwtPayload } from 'types';

// The initial state of the Authentication container
export const initialState: ContainerState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.accessToken = action.payload;
    },
    loginError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      AuthService.removeToken();
      state.accessToken = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setUser(state, action: PayloadAction<JwtPayload | null>) {
      state.user = action.payload;
    },
  },
});

export const {
  actions: authenticationActions,
  reducer,
  name: sliceKey,
} = authenticationSlice;
