import { Listing } from 'types';

/* --- STATE --- */
export interface SpecialistServicesState {
  listings: Listing[];
  loading: boolean;
  error?: null | string;
}

export type ContainerState = SpecialistServicesState;
