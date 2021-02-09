import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { User } from 'types';

// The initial state of the UserInfo container
export const initialState: ContainerState = {
  user: null,
  loading: false,
  error: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loadUser(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    userLoaded(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    userError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  actions: userInfoActions,
  reducer,
  name: sliceKey,
} = userInfoSlice;
