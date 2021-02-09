import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.listingEditorModal || initialState;

export const selectIsOpen = createSelector(
  [selectDomain],
  listingEditorModalState => listingEditorModalState.isOpen,
);

export const selectListing = createSelector(
  [selectDomain],
  listingEditorModalState => listingEditorModalState.listing,
);
