import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.specialistServices || initialState;

export const selectListings = createSelector(
  [selectDomain],
  specialistServicesState => specialistServicesState.listings,
);

export const selectLoading = createSelector(
  [selectDomain],
  specialistServicesState => specialistServicesState.loading,
);
