import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state?.authentication || initialState;

export const selectAuthentication = createSelector(
  [selectDomain],
  authenticationState => authenticationState,
);

export const selectUser = createSelector(
  [selectDomain],
  authenticationState => authenticationState.user,
);

export const selectAccessToken = createSelector(
  [selectDomain],
  authenticationState => authenticationState.accessToken,
);

export const selectError = createSelector(
  [selectDomain],
  authenticationState => authenticationState.error,
);
