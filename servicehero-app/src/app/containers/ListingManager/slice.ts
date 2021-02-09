import { PayloadAction } from '@reduxjs/toolkit';
import { ListingDto } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, EditListingPayload } from './types';

// The initial state of the ListingManager container
export const initialState: ContainerState = {
  isSuccess: false,
  loading: false,
  error: null,
};

const listingManagerSlice = createSlice({
  name: 'listingManager',
  initialState,
  reducers: {
    editListing(state, action: PayloadAction<EditListingPayload>) {
      state.loading = true;
    },
    addListing(state, action: PayloadAction<ListingDto>) {
      state.loading = true;
    },
    deleteListing(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    listingActionSuccess(state) {
      state.isSuccess = true;
      state.loading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    reset(state) {
      state.isSuccess = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  actions: listingManagerActions,
  reducer,
  name: sliceKey,
} = listingManagerSlice;
