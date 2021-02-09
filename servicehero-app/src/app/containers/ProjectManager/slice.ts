import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  ContainerState,
  UpdateReviewPayload,
  UpdateStatusPayload,
} from './types';

// The initial state of the ProjectManager container
export const initialState: ContainerState = {
  isSuccess: false,
  loading: false,
  error: null,
};

const projectManagerSlice = createSlice({
  name: 'projectManager',
  initialState,
  reducers: {
    createProject(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    updateStatus(state, action: PayloadAction<UpdateStatusPayload>) {
      state.loading = true;
      state.error = null;
    },
    projectActionSuccess(state) {
      state.loading = false;
      state.error = null;
      state.isSuccess = true;
    },
    updateReview(state, action: PayloadAction<UpdateReviewPayload>) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    reset(state) {
      state.isSuccess = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  actions: projectManagerActions,
  reducer,
  name: sliceKey,
} = projectManagerSlice;
