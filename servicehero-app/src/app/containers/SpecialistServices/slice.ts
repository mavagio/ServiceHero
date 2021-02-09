import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Listing } from 'types';

// The initial state of the SpecialistServices container
export const initialState: ContainerState = {
  listings: [],
  loading: false,
  error: null,
};

const specialistServicesSlice = createSlice({
  name: 'specialistServices',
  initialState,
  reducers: {
    loadListings(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    listingsLoaded(state, action: PayloadAction<Listing[]>) {
      state.listings = action.payload;
      state.loading = false;
    },
    listingsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  actions: specialistServicesActions,
  reducer,
  name: sliceKey,
} = specialistServicesSlice;
