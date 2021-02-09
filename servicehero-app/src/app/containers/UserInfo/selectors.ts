import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.userInfo || initialState;

export const selectUser = createSelector(
  [selectDomain],
  userInfoState => userInfoState.user,
);

export const selectLoading = createSelector(
  [selectDomain],
  userInfoState => userInfoState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  userInfoState => userInfoState.error,
);
