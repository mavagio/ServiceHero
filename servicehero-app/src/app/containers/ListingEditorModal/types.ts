import { Listing } from 'types';

/* --- STATE --- */
export interface ListingEditorModalState {
  isOpen: boolean;
  listing?: Listing | null;
}

export type ContainerState = ListingEditorModalState;
