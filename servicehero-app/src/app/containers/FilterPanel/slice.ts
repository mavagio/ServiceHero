import { PayloadAction } from '@reduxjs/toolkit';
import { ListingType } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the FilterPanel container
export const initialState: ContainerState = {
  queryParam: '',
  filter: {},
};

const filterPanelSlice = createSlice({
  name: 'filterPanel',
  initialState,
  reducers: {
    setQueryParams(state, action: PayloadAction<string>) {
      state.queryParam = action.payload;
    },
    setHourlyRateFrom(state, action: PayloadAction<number | null>) {
      state.filter.hourlyRateFrom = action.payload;
    },
    setHourlyRateTo(state, action: PayloadAction<number | null>) {
      state.filter.hourlyRateTo = action.payload;
    },
    setListingTypes(state, action: PayloadAction<ListingType[] | null>) {
      state.filter.listingTypes = action.payload;
    },
    setRating(state, action: PayloadAction<number | null>) {
      state.filter.rating = action.payload;
    },
    resetFilters(state) {
      state.filter = {};
    },
  },
});

export const {
  actions: filterPanelActions,
  reducer,
  name: sliceKey,
} = filterPanelSlice;
