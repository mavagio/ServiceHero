import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Listing } from 'types';

// The initial state of the ListingEditorModal container
export const initialState: ContainerState = {
  isOpen: false,
};

const listingEditorModalSlice = createSlice({
  name: 'listingEditorModal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Listing | null>) {
      state.listing = action?.payload;
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
      state.listing = null;
    },
    removeListing(state) {
      state.listing = null;
    },
  },
});

export const {
  actions: listingEditorModalActions,
  reducer,
  name: sliceKey,
} = listingEditorModalSlice;
