import { ListingDto } from 'types';
export interface ListingManagerState {
  isSuccess: boolean;
  loading: boolean;
  error?: null | string;
}

export interface EditListingPayload {
  id: string;
  listingDto: ListingDto;
}

export type ContainerState = ListingManagerState;
