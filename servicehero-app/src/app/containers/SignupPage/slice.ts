import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, UserDto } from './types';

// The initial state of the SignupPage container
export const initialState: ContainerState = {
  isSuccess: false,
  loading: false,
  error: null,
};

const signupPageSlice = createSlice({
  name: 'signupPage',
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<UserDto>) {
      state.loading = true;
      state.error = null;
    },
    singUpSuccess(state) {
      state.isSuccess = true;
      state.loading = false;
      state.error = null;
    },
    signUpError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.isSuccess = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  actions: signupPageActions,
  reducer,
  name: sliceKey,
} = signupPageSlice;
