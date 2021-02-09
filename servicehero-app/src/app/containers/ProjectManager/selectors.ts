import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.projectManager || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  projectManagerState => projectManagerState.loading,
);

export const selectIsSuccess = createSelector(
  [selectDomain],
  projectManagerState => projectManagerState.isSuccess,
);

export const selectError = createSelector(
  [selectDomain],
  projectManagerState => projectManagerState.error,
);
