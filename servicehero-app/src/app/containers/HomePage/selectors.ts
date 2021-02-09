import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.homePage || initialState;

export const selectListings = createSelector(
  [selectDomain],
  homePageState => homePageState.listings,
);

export const selectLoading = createSelector(
  [selectDomain],
  homePageState => homePageState.loading,
);
