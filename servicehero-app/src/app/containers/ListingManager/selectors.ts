import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state?.listingManager || initialState;

export const selectIsSuccess = createSelector(
  [selectDomain],
  listingManagerState => listingManagerState.isSuccess,
);

export const selectError = createSelector(
  [selectDomain],
  listingManagerState => listingManagerState.error,
);

export const selectLoading = createSelector(
  [selectDomain],
  listingManagerState => listingManagerState.loading,
);
