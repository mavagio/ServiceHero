import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.userProjects || initialState;

export const selectProjects = createSelector(
  [selectDomain],
  userProjectsState => userProjectsState.projects,
);

export const selectLoading = createSelector(
  [selectDomain],
  userProjectsState => userProjectsState.loading,
);
