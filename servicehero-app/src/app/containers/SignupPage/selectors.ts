import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.signupPage || initialState;

export const selectSignupPage = createSelector(
  [selectDomain],
  signupPageState => signupPageState,
);

export const selectError = createSelector(
  [selectDomain],
  signupPageState => signupPageState.error,
);

export const selectLoading = createSelector(
  [selectDomain],
  signupPageState => signupPageState.loading,
);

export const selectIsSuccess = createSelector(
  [selectDomain],
  signupPageState => signupPageState.isSuccess,
);
