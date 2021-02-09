import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, FetchProjectPayload } from './types';
import { Project } from 'types';

// The initial state of the UserProjects container
export const initialState: ContainerState = {
  projects: [],
  loading: false,
  error: null,
};

const userProjectsSlice = createSlice({
  name: 'userProjects',
  initialState,
  reducers: {
    loadProjects(state, action: PayloadAction<FetchProjectPayload>) {
      state.loading = true;
      state.error = null;
    },
    projectsLoaded(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
      state.loading = false;
    },
    projectsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  actions: userProjectsActions,
  reducer,
  name: sliceKey,
} = userProjectsSlice;
