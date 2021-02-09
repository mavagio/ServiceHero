import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.filterPanel || initialState;

export const selectQueryParam = createSelector(
  [selectDomain],
  filterPanelState => filterPanelState.queryParam,
);

export const selectHourlyRateFrom = createSelector(
  [selectDomain],
  filterPanelState => filterPanelState.filter.hourlyRateFrom,
);

export const selectHourlyRateTo = createSelector(
  [selectDomain],
  filterPanelState => filterPanelState.filter.hourlyRateTo,
);

export const selectListingTypes = createSelector(
  [selectDomain],
  filterPanelState => filterPanelState.filter.listingTypes,
);

export const selectRating = createSelector(
  [selectDomain],
  filterPanelState => filterPanelState.filter.rating,
);
