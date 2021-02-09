import { FilterTypes } from 'types';

/* --- STATE --- */
export interface FilterPanelState {
  queryParam: string;
  filter: FilterTypes;
}

export type ContainerState = FilterPanelState;
