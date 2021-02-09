import { Listing } from 'types';

/* --- STATE --- */
export interface HomePageState {
  listings: Listing[];
  loading: boolean;
  error?: string | null;
}

export type ContainerState = HomePageState;
